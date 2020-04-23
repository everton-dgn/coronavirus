import { $ } from './help.js';

// criação da tabela paises, filtro de pesquisa e paginação:
let pag = 0;
let tamanhoPag = 10;
let paises = [];
let tabela3 = $('[data-pais-altura]');
let tabelaBody3 = $('#tabela-body3');

$('#voltarInicio3').addEventListener("click", voltarInicio3);
$('#proximo3').addEventListener("click", avancarPagina3);
$('#anterior3').addEventListener("click", recuarPagina3);
$('#irFinal3').addEventListener("click", irFinal3);

(async function pegaPais() {
    let spinner3 = $('#spinner3');

    paises = (await fetch("https://corona-stats.online/?format=json").then(res => res.json())).data;

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
})()

function imprimirTabela3() {
    tabelaBody3.innerHTML = "";

    for (let i = pag; i < pag + (tamanhoPag < paises.length - pag ? tamanhoPag : paises.length % 10); i++) {
        tabelaBody3.innerHTML += '<tr><td><img src="' + paises[i].countryInfo.flag + '" width="30"></td>' + '<td>' + paises[i].country + '</td>' + '<td>' + paises[i].confirmed.toLocaleString('pt-BR') + '</td>' + '<td>' + paises[i].deaths.toLocaleString('pt-BR') + '</td>' + '<td>' + parseFloat((paises[i].deaths * 100 / paises[i].confirmed).toFixed(1)) + '%' + '</td></tr>';
    }
}
function voltarInicio3() {
    pag = 0;
    imprimirTabela3();
}
function avancarPagina3() {
    if (pag <= 200)
        pag += tamanhoPag;
    imprimirTabela3();
}
function recuarPagina3() {
    if (pag >= tamanhoPag)
        pag -= tamanhoPag;
    imprimirTabela3();
}
function irFinal3() {
    if (pag = 200)
        pag += tamanhoPag;
    imprimirTabela3();
}
