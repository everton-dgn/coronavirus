import { $, $$ } from './help.js';

// criação da tabela estado, filtro de pesquisa, paginação e manipulação do mapa:
let pag = 0;
let tamanhoPag = 10;
let estados = [];
let tabela = $('[data-estado-altura]');
let tabelaBody = $('#tabela-body2');

$('#voltarInicio2').addEventListener("click", voltarInicio);
$('#proximo2').addEventListener("click", avancarPagina);
$('#anterior2').addEventListener("click", recuarPagina);
$('#irFinal2').addEventListener("click", irFinal);

(async function pegaEstado() {
    let spinner = $('#spinner2');

    estados = (await await fetch("https://covid19-brazil-api.now.sh/api/report/v1").then(res => res.json())).data;

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
        tabelaBody.innerHTML = "";

        // imprime as 10 linhas filtradas na tabela //
        estadosFiltrados.map(item => {
            tabelaBody.innerHTML += '<tr title="' + item.state + '"><td>' + item.state + '</td>' + '<td>' + item.cases.toLocaleString('pt-BR') + '</td>' + '<td>' + item.deaths.toLocaleString('pt-BR') + '</td>' + '<td>' + parseFloat((item.deaths * 100 / item.cases).toFixed(1)) + '%' + '</td>' + '</tr>';
        });

    }
    // pesquisar estado the end //

    imprimirTabela();

    // exibe a tabela e esconde o spinner automaticamente após a promessa se resolver (execução vertical do código) //
    tabela.style.display = "table";
    spinner.style.display = "none";

    // click no estado do mapa exibe dados do estado //
    $$('#svg-map a').forEach(item => item.addEventListener('click', estadosBrasileiros));
    function estadosBrasileiros(e) {
        e.preventDefault();
        // captura nome do title de cada estado ao clicar //
        const nomedoEstado = this.getAttribute("title");
        const valor = nomedoEstado.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        // retorna o objeto contendo os dados do estado clicado //
        const estadosFiltradosMapa = estados.filter(item => {
            return item.state.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(valor) > -1;
        }).slice(0, 1);

        // limpa linha da tabela antes de imprimir uma nova //
        $('#tabela-body0').innerHTML = "";

        // imprime a linha com informações referente ao estado clicado //
        estadosFiltradosMapa.map(item => {
            $('#tabela-body0').innerHTML += '<tr title="' + item.state + '"><td>' + item.state + '</td>' + '<td>' + item.cases.toLocaleString('pt-BR') + '</td>' + '<td>' + item.deaths.toLocaleString('pt-BR') + '</td>' + '<td>' + parseFloat((item.deaths * 100 / item.cases).toFixed(1)) + '%' + '</td>' + '</tr>';
        });

    }
})()

function imprimirTabela() {
    // limpa tabela dos estados antes de imprimir uma nova //
    tabelaBody.innerHTML = "";

    // imprime tabela de estados 10 linhas por vez //
    for (let i = pag; i < pag + (tamanhoPag < estados.length - pag ? tamanhoPag : estados.length % 10); i++) {
        tabelaBody.innerHTML += '<tr title="' + estados[i].state + '"><td>' + estados[i].state + '</td>' + '<td>' + estados[i].cases.toLocaleString('pt-BR') + '</td>' + '<td>' + estados[i].deaths.toLocaleString('pt-BR') + '</td>' + '<td>' + parseFloat((estados[i].deaths * 100 / estados[i].cases).toFixed(1)) + '%' + '</td>' + '</tr>';
    }
}

function voltarInicio() {
    pag = 0;
    imprimirTabela();
}
function avancarPagina() {
    if (pag <= 10)
        pag += tamanhoPag;
    imprimirTabela();
}
function recuarPagina() {
    if (pag >= tamanhoPag)
        pag -= tamanhoPag;
    imprimirTabela();
}
function irFinal() {
    if (pag = 10)
        pag += tamanhoPag;
    imprimirTabela();
}