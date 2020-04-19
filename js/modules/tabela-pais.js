import { $ } from './help.js';

// criação da tabela paises, filtro de pesquisa e paginação:
let paises = [];
let index3 = 0;
let tamanhoDaPagina3 = 10;
let tabela3 = $('[data-pais-altura]');
let tabelaBody3 = $('#tabela-body3');
let voltarInicioP3 = $('#voltarInicio3');
let botaoProximo3 = $('#proximo3');
let botaoAnterior3 = $('#anterior3');
let irFinalP3 = $('#irFinal3');
const urlPais = "https://corona-stats.online/?format=json";

export async function pegaPais() {
    let spinner3 = $('#spinner3');
    tabela3.style.display = "none";

    let requisicao3 = await fetch(urlPais);
    let resultados3 = await requisicao3.json();
    paises = resultados3.data;

    // pesquisar pais start //
    $("#pesquisarPais").addEventListener("keyup", buscarPais);

    function buscarPais() {

        // recebe valor digitado //
        const valor3 = $("#pesquisarPais").value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        // retorna os 10 primeiro itens do array que possui o país correspondente ao texto digitado //
        const paisesFiltrados = paises.filter(item => {
            return item.country.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(valor3) > -1;
        }).slice(0, 10);

        // limpa a tabela antes de imprimir as 10 linhas //
        tabelaBody3.innerHTML = "";

        // imprime as 10 linhas filtradas na tabela //
        paisesFiltrados.map(item => {
            tabelaBody3.innerHTML += '<tr><td><img src="' + item.countryInfo.flag + '" width="30"></td>' + '<td>' + item.country + '</td>' + '<td>' + item.confirmed.toLocaleString('pt-BR') + '</td>' + '<td>' + item.deaths.toLocaleString('pt-BR') + '</td>' + '<td>' + parseFloat((item.deaths * 100 / item.confirmed).toFixed(1)) + '%' + '</td></tr>';
        });

    }
    // pesquisar pais the end //

    imprimirTabela3();

    // exibe a tabela e esconde o spinner automaticamente após a promessa se resolver (execução vertical do código) //
    tabela3.style.display = "table";
    spinner3.style.display = "none";
}
pegaPais();
function imprimirTabela3() {
    tabelaBody3.innerHTML = "";

    for (let i = index3; i < index3 + (tamanhoDaPagina3 < paises.length - index3 ? tamanhoDaPagina3 : paises.length % 10); i++) {
        tabelaBody3.innerHTML += '<tr><td><img src="' + paises[i].countryInfo.flag + '" width="30"></td>' + '<td>' + paises[i].country + '</td>' + '<td>' + paises[i].confirmed.toLocaleString('pt-BR') + '</td>' + '<td>' + paises[i].deaths.toLocaleString('pt-BR') + '</td>' + '<td>' + parseFloat((paises[i].deaths * 100 / paises[i].confirmed).toFixed(1)) + '%' + '</td></tr>';
    }
}
function voltarInicio3() {
    index3 = 0;
    imprimirTabela3();
}
function avancarPagina3() {
    if (index3 <= 200)
        index3 += tamanhoDaPagina3;
    imprimirTabela3();
}
function recuarPagina3() {
    if (index3 >= tamanhoDaPagina3)
        index3 -= tamanhoDaPagina3;
    imprimirTabela3();
}
function irFinal3() {
    if (index3 = 200)
        index3 += tamanhoDaPagina3;
    imprimirTabela3();
}
voltarInicioP3.addEventListener("click", voltarInicio3);
botaoProximo3.addEventListener("click", avancarPagina3);
botaoAnterior3.addEventListener("click", recuarPagina3);
irFinalP3.addEventListener("click", irFinal3);