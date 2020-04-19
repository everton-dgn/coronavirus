import { $ } from './help.js';

// criação da tabela cidade, filtro de pesquisa e paginação:
let cidades = [];
let estadosSigla = [];
let index = 0;
let tamanhoDaPagina = 10;
let tabela = $('[data-cidade-altura]');
let tabelaBody = $('#tabela-body');
let voltarInicioP = $('#voltarInicio');
let botaoProximo = $('#proximo');
let botaoAnterior = $('#anterior');
let irFinalP = $('#irFinal');

export async function pegaCidades() {
    let spinner = $('#spinner');
    tabela.style.display = "none";

    let requisicao = await fetch("https://api.coronaanalytic.com/journal");
    let resultados = await requisicao.json();
    let { values } = resultados; // sintáxe equivalente a resultados.values //
    // resultado: array com 27 objetos, cada objeto tem 3 itens, sendo o último um array com todas cidades do estado //
    // map() retorna um array de 27 chaves sendo cada uma um array das cidades do estado //
    // flat() junta todas cidades em um array só de 583 objetos contendo cidade e número de casos //
    cidades = values.map((el) => el.citys).flat();

    // pesquisar cidade start //
    // Gera lista de siglas de estados para as cidades em um array //
    estadosSigla = values.map(retornaEstado).flat(Infinity);
    function retornaEstado(sigla) {
        return Array(sigla.citys.length).fill(sigla.state); // cria quantidade x de arrays vazios e adiciona em cada slot um valor da iteração
    }

    $("#pesquisarCidade").addEventListener("keyup", buscarCidades);
    function buscarCidades() {

        // lista (e une) em um array os arrays [cidade, estado, casos] //
        let dadosCompletos = cidades.map((item, index) => {
            return [item.city, estadosSigla[index], item.cases]
        });

        // recebe valor digitado //
        const valor = $("#pesquisarCidade").value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        // retorna os 10 primeiro itens do array que possui a cidade correspondente ao texto digitado //
        const cidadesFiltradas = dadosCompletos.filter(item => {
            return item[0].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(valor) > -1;
        }).slice(0, 10);

        // limpa a tabela antes de imprimir as 10 linhas //
        tabelaBody.innerHTML = "";

        // imprime as 10 linhas filtradas na tabela //
        cidadesFiltradas.map(item => {
            tabelaBody.innerHTML += '<tr><td>' + item[0] + '</td>' + '<td>' + item[1] + '</td>' + '<td>' + item[2].toLocaleString('pt-BR') + '</td></tr>';
        });

    }
    // pesquisar cidade the end //

    imprimirTabela();

    // exibe a tabela e esconde o spinner automaticamente após a promessa se resolver //
    tabela.style.display = "table";
    spinner.style.display = "none";
}
pegaCidades();
function imprimirTabela() {
    // limpa tabela de cidades antes de imprimir uma nova
    tabelaBody.innerHTML = "";

    // imprime tabela de cidades 10 linhas por vez //
    for (let i = index; i < index + (tamanhoDaPagina < cidades.length - index ? tamanhoDaPagina : cidades.length % 10); i++) {
        tabelaBody.innerHTML += '<tr><td>' + cidades[i].city + '</td>' + '<td>' + estadosSigla[i] + '</td>' + '<td>' + cidades[i].cases.toLocaleString('pt-BR') + '</td></tr>';
    }
}
function voltarInicio() {
    index = 0;
    imprimirTabela();
}
function avancarPagina() {
    if (index <= 570)
        index += tamanhoDaPagina;
    imprimirTabela();
}
function recuarPagina() {
    if (index >= tamanhoDaPagina)
        index -= tamanhoDaPagina;
    imprimirTabela();
}
function irFinal() {
    if (index = cidades.length - cidades.length % 10 - 10)
        index += tamanhoDaPagina;
    imprimirTabela();
}
voltarInicioP.addEventListener("click", voltarInicio);
botaoProximo.addEventListener("click", avancarPagina);
botaoAnterior.addEventListener("click", recuarPagina);
irFinalP.addEventListener("click", irFinal);