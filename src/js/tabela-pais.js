import { $ } from './help.js';

// criação da tabela paises, filtro de pesquisa e paginação:
let pag = 1
let tamanhoPag = 10;
let paises = [];
let tabela = $('[data-pais-altura]');
let tabelaBody = $('#tabela-body3');

// bloquear enter de recarregar pág. //
$('#pesquisarPais').addEventListener('keypress', (e) => {
    if (e.which == 13) e.preventDefault();
});

$('#pesquisarPais').addEventListener("input", buscarPaises);
$('#voltarInicio3').addEventListener("click", voltarInicio);
$('#proximo3').addEventListener("click", avancarPag);
$('#anterior3').addEventListener("click", recuarPag);
$('#irFinal3').addEventListener("click", irFinal);

(async function pegaPais() {
    let recebePaises = (await fetch("https://corona-stats.online/?format=json").then(res => res.json())).data;

    recebePaises.map(dados => {
        paises.push(dados);
    });

    imprimirTabela();

    // exibe a tabela e esconde o spinner automaticamente após a promessa se resolver (execução vertical do código) //
    tabela.style.display = "table";
    $('#spinner3').style.display = "none";
})();

function buscarPaises(event) {
    // recebe valor digitado //
    const valor = event.target.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    // retorna os 10 primeiro itens do array que possui o país correspondente ao texto digitado //
    const paisesFiltrados = paises.filter(item => item.country.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(valor) > -1).slice(0, 10);

    // Imprime a tabela com os dados filtrados //
    imprimirTabela(paisesFiltrados);
}

function imprimirTabela(dados) {
    if (!dados) dados = paises.slice((pag - 1) * tamanhoPag, pag * tamanhoPag);

    tabelaBody.innerHTML = "";

    dados.forEach(item => {
        tabelaBody.innerHTML += '<tr><td><img src="' + item.countryInfo.flag + '" width="30"></td>' + '<td>' + item.country + '</td>' + '<td>' + item.confirmed.toLocaleString('pt-BR') + '</td>' + '<td>' + item.deaths.toLocaleString('pt-BR') + '</td>' + '<td>' + parseFloat((item.deaths * 100 / item.confirmed).toFixed(1)) + '%' + '</td></tr>';
    });
}

function voltarInicio() {
    pag = 1;
    imprimirTabela();
}
function avancarPag() {
    if (pag != Math.floor(paises.length / 10) + (paises.length % 10 > 0 ? 1 : 0)) pag++;
    imprimirTabela();
}
function recuarPag() {
    if (pag != 1) pag--;
    imprimirTabela();
}
function irFinal() {
    pag = Math.floor(paises.length / 10) + (paises.length % 10 > 0 ? 1 : 0);
    imprimirTabela();
}
