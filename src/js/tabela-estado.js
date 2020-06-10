import { $, $$ } from './help.js';

// criação da tabela estado, filtro de pesquisa, paginação e manipulação do mapa:
let pag = 1;
let tamanhoPag = 10;
let estados = [];
let tabela = $('[data-estado-altura]');
let tabelaBody = $('#tabela-body2');

// bloquear enter de recarregar pág. //
$('#pesquisarEstado').addEventListener('keypress', (e) => {
    if (e.which == 13) e.preventDefault();
});

$('#pesquisarEstado').addEventListener("input", buscarEstados);
$('#voltarInicio2').addEventListener("click", voltarInicio);
$('#proximo2').addEventListener("click", avancarPag);
$('#anterior2').addEventListener("click", recuarPag);
$('#irFinal2').addEventListener("click", irFinal);

(async function pegaEstado() {
    let receberEstados = (await await fetch("https://covid19-brazil-api.now.sh/api/report/v1").then(res => res.json())).data;

    receberEstados.map(dados => {
        estados.push(dados);
    });

    // click no estado do mapa exibe dados do estado //
    $$('#svg-map a').forEach(item => item.addEventListener('click', estadosBrasileiros));
    function estadosBrasileiros(e) {
        e.preventDefault();
        // captura nome do title de cada estado ao clicar //
        const nomedoEstado = this.getAttribute("title");
        const valor = nomedoEstado.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        // retorna o objeto contendo os dados do estado clicado //
        const estadosFiltradosMapa = receberEstados.filter(item => item.state.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(valor) > -1).slice(0, 1);

        // limpa linha da tabela antes de imprimir uma nova //
        $('#tabela-body0').innerHTML = "";

        // imprime a linha com informações referente ao estado clicado //
        estadosFiltradosMapa.map(item => {
            $('#tabela-body0').innerHTML += '<tr title="' + item.state + '"><td>' + item.state + '</td>' + '<td>' + item.cases.toLocaleString('pt-BR') + '</td>' + '<td>' + item.deaths.toLocaleString('pt-BR') + '</td>' + '<td>' + parseFloat((item.deaths * 100 / item.cases).toFixed(1)) + '%' + '</td>' + '</tr>';
        });

    }

    imprimirTabela();

    // exibe a tabela e esconde o spinner automaticamente após a promessa se resolver (execução vertical do código) //
    tabela.style.display = "table";
    $('#spinner2').style.display = "none";
})()

function buscarEstados(event) {
    // recebe valor digitado //
    const valor = event.target.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    // retorna os 10 primeiro itens do array que possui o estado correspondente ao texto digitado //
    const estadosFiltrados = estados.filter(item => item.state.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(valor) > -1).slice(0, 10);

    // imprime as 10 linhas filtradas na tabela //
    imprimirTabela(estadosFiltrados);
}

function imprimirTabela(dados) {
    if (!dados) dados = estados.slice((pag - 1) * tamanhoPag, pag * tamanhoPag);

    tabelaBody.innerHTML = "";

    dados.forEach(item => {
        tabelaBody.innerHTML += '<tr title="' + item.state + '"><td>' + item.state + '</td>' + '<td>' + item.cases.toLocaleString('pt-BR') + '</td>' + '<td>' + item.deaths.toLocaleString('pt-BR') + '</td>' + '<td>' + parseFloat((item.deaths * 100 / item.cases).toFixed(1)) + '%' + '</td>' + '</tr>';
    });
}

function voltarInicio() {
    pag = 1;
    imprimirTabela();
}
function avancarPag() {
    if (pag != Math.floor(estados.length / 10) + (estados.length % 10 > 0 ? 1 : 0)) pag++;
    imprimirTabela();
}
function recuarPag() {
    if (pag != 1) pag--;
    imprimirTabela();
}
function irFinal() {
    pag = Math.floor(estados.length / 10) + (estados.length % 10 > 0 ? 1 : 0);
    imprimirTabela();
}