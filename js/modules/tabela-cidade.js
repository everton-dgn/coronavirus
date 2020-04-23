import { $ } from './help.js';

// criação da tabela cidade, filtro de pesquisa e paginação:
let pag = 1;
let tamanhoPag = 10;
let cidades = [];
let tabela = $('[data-cidade-altura]');
let tabelaBody = $('#tabela-body');

// bloquear enter de recarregar pág. //
$('#pesquisarCidade').addEventListener('keypress', (e) => {
    if (e.which == 13) e.preventDefault();
});

$("#pesquisarCidade").addEventListener("input", buscarCidades);
$('#voltarInicio').addEventListener("click", voltarInicio);
$('#proximo').addEventListener("click", avancarPag);
$('#anterior').addEventListener("click", recuarPag);
$('#irFinal').addEventListener("click", irFinal);

(async function () {
    // Busca os dados na API, converte em json e faz a desestruturação, retornando apenas a chave "values"
    let { values } = await fetch("https://api.coronaanalytic.com/journal").then(res => res.json());

    let cidadesOrganizadas = []

    values.map(dados => { // map() retorna um array de 27 chaves sendo cada uma um array das cidades do estado //
        return dados.citys.map(cidade => { // Pega as cidades de cada estado
            cidade.estado = dados.state; // Adiciona a chave "estado" com a sigla do estado ao objeto
            cidadesOrganizadas.push(cidade);
        });
    });

    // organiza lista de cidades em ordem decrescente de casos //
    let enviarCidades = await cidadesOrganizadas.sort(ordenarPorIdade);
    cidades.push(...enviarCidades);
    function ordenarPorIdade(a, b) {
        return b.cases - a.cases;
    }

    imprimirTabela();

    // exibe a tabela e esconde o spinner automaticamente após a promessa se resolver //
    tabela.style.display = "table";
    $('#spinner').style.display = "none";
})();

function buscarCidades(event) {
    // recebe valor digitado //
    const valor = event.target.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    // retorna os 10 primeiro itens do array que possui a cidade correspondente ao texto digitado //
    const cidadesFiltradas = cidades.filter(item => item.city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(valor) > -1).slice(0, 10);

    // Imprime a tabela com os dados filtrados //
    imprimirTabela(cidadesFiltradas);
}

function imprimirTabela(dados) {
    if (!dados) dados = cidades.slice((pag - 1) * tamanhoPag, pag * tamanhoPag);

    tabelaBody.innerHTML = "";

    dados.forEach(item => {
        tabelaBody.innerHTML += '<tr><td>' + item.city + '</td>' + '<td>' + item.estado + '</td>' + '<td>' + item.cases.toLocaleString('pt-BR') + '</td></tr>';
    });
}

function voltarInicio() {
    pag = 1;
    imprimirTabela();
}
function avancarPag() {
    if (pag != Math.floor(cidades.length / 10) + (cidades.length % 10 > 0 ? 1 : 0)) pag++;
    imprimirTabela();
}
function recuarPag() {
    if (pag != 1) pag--;
    imprimirTabela();
}
function irFinal() {
    pag = Math.floor(cidades.length / 10) + (cidades.length % 10 > 0 ? 1 : 0);
    imprimirTabela();
}