import { $, $$ } from './help.js';

// criação da tabela estado, filtro de pesquisa, paginação e manipulação do mapa:
let estados = [];
let index2 = 0;
let tamanhoDaPagina2 = 10;
let tabela2 = $('[data-estado-altura]');
let tabelaBody2 = $('#tabela-body2');
let voltarInicioP2 = $('#voltarInicio2');
let botaoProximo2 = $('#proximo2');
let botaoAnterior2 = $('#anterior2');
let irFinalP2 = $('#irFinal2');
const urlEstado = "https://covid19-brazil-api.now.sh/api/report/v1";

export async function pegaEstado() {
    let spinner2 = $('#spinner2');
    tabela2.style.display = "none";

    let requisicao2 = await fetch(urlEstado);
    let resultados2 = await requisicao2.json();
    estados = resultados2.data;

    // pesquisar estado start //
    $("#pesquisarEstado").addEventListener("keyup", buscarEstado);

    function buscarEstado() {

        // recebe valor digitado //
        const valor = $("#pesquisarEstado").value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        // retorna os 10 primeiro itens do array que possui o estado correspondente ao texto digitado //
        const estadosFiltrados = estados.filter(item => {
            return item.state.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(valor) > -1;
        }).slice(0, 10);

        // limpa a tabela antes de imprimir as 10 linhas //
        tabelaBody2.innerHTML = "";

        // imprime as 10 linhas filtradas na tabela //
        estadosFiltrados.map(item => {
            tabelaBody2.innerHTML += '<tr title="' + item.state + '"><td>' + item.state + '</td>' + '<td>' + item.cases.toLocaleString('pt-BR') + '</td>' + '<td>' + item.deaths.toLocaleString('pt-BR') + '</td>' + '<td>' + parseFloat((item.deaths * 100 / item.cases).toFixed(1)) + '%' + '</td>' + '</tr>';
        });

    }
    // pesquisar estado the end //

    imprimirTabela2();

    // exibe a tabela e esconde o spinner automaticamente após a promessa se resolver (execução vertical do código) //
    tabela2.style.display = "table";
    spinner2.style.display = "none";

    // click no estado do mapa exibe dados do estado //
    $$('#svg-map a').forEach(item => item.addEventListener('click', estadosBrasileiros));
    function estadosBrasileiros(e) {
        e.preventDefault();
        // captura nome do title de cada estado ao clicar //
        const nomedoEstado = this.getAttribute("title");
        const valor2 = nomedoEstado.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        // retorna o objeto contendo os dados do estado clicado //
        const estadosFiltradosMapa = estados.filter(item => {
            return item.state.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(valor2) > -1;
        }).slice(0, 1);

        // limpa linha da tabela antes de imprimir uma nova //
        $('#tabela-body0').innerHTML = "";

        // imprime a linha com informações referente ao estado clicado //
        estadosFiltradosMapa.map(item => {
            $('#tabela-body0').innerHTML += '<tr title="' + item.state + '"><td>' + item.state + '</td>' + '<td>' + item.cases.toLocaleString('pt-BR') + '</td>' + '<td>' + item.deaths.toLocaleString('pt-BR') + '</td>' + '<td>' + parseFloat((item.deaths * 100 / item.cases).toFixed(1)) + '%' + '</td>' + '</tr>';
        });

    }
}
pegaEstado();
function imprimirTabela2() {
    // limpa tabela dos estados antes de imprimir uma nova //
    tabelaBody2.innerHTML = "";

    // imprime tabela de estados 10 linhas por vez //
    for (let i = index2; i < index2 + (tamanhoDaPagina2 < estados.length - index2 ? tamanhoDaPagina2 : estados.length % 10); i++) {
        tabelaBody2.innerHTML += '<tr title="' + estados[i].state + '"><td>' + estados[i].state + '</td>' + '<td>' + estados[i].cases.toLocaleString('pt-BR') + '</td>' + '<td>' + estados[i].deaths.toLocaleString('pt-BR') + '</td>' + '<td>' + parseFloat((estados[i].deaths * 100 / estados[i].cases).toFixed(1)) + '%' + '</td>' + '</tr>';
    }
}
function voltarInicio2() {
    index2 = 0;
    imprimirTabela2();
}
function avancarPagina2() {
    if (index2 <= 10)
        index2 += tamanhoDaPagina2;
    imprimirTabela2();
}
function recuarPagina2() {
    if (index2 >= tamanhoDaPagina2)
        index2 -= tamanhoDaPagina2;
    imprimirTabela2();
}
function irFinal2() {
    if (index2 = 10)
        index2 += tamanhoDaPagina2;
    imprimirTabela2();
}
voltarInicioP2.addEventListener("click", voltarInicio2);
botaoProximo2.addEventListener("click", avancarPagina2);
botaoAnterior2.addEventListener("click", recuarPagina2);
irFinalP2.addEventListener("click", irFinal2);