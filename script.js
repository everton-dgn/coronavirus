const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// corona virus
const date = $('[data-date]');
const suspects = $('[data-suspects]');
const confirmed = $('[data-confirmed]');
const deaths = $('[data-deaths]');

function coronaVirus2() {
    fetch('https://covid19-brazil-api.now.sh/api/report/v1/brazil')
        .then(r => r.json())
        .then(data => {
            date.innerHTML = 'Até a Data Atual: <b>' + hoje + '</b>';
            suspects.innerHTML = 'Casos Suspeitos: <b>' + data.data.confirmed.toLocaleString('pt-BR') + '</b>';
            confirmed.innerHTML = 'Casos Confirmados: <b>' + data.data.cases.toLocaleString('pt-BR') + '</b>';
            deaths.innerHTML = 'Total de Mortos: <b>' + data.data.deaths.toLocaleString('pt-BR') + '</b>';
        });
}
coronaVirus2();
setInterval(() => coronaVirus2(), 1000 * 60 * 60);

// tabela
const tabela = $('[data-tabela]');

fetch("https://covid19-brazil-api.now.sh/api/report/v1")
    .then(response => response.json())
    .then(data => {
        data.data.forEach((item) => {
            $('[data-tabela]').innerHTML += '<tr><td>' + item.state + '</td>' + '<td>' + item.cases + '</td>' + '<td>' + item.deaths + '</td>' + '<td>' + item.suspects + '</td>' + '</tr>';
        });
    });

// função para converter data
function converterData(dataPar) {
    const dataRecebida = dataPar.replace('-', '/').replace('-', '/').replace('T', ' ').split(' ');
    const dataTratada = dataRecebida[0].split('/');

    const dataAtual = dataTratada[2].padStart(2, '0') + '/' + dataTratada[1].padStart(2, '0') + '/' + dataTratada[0];

    return dataAtual;
}

// mostra data atual:
const agora = new Date();
const dia = agora.getDate();
const mes = agora.getUTCMonth() + 1;
const ano = agora.getUTCFullYear();
const hoje = dia.toString().padStart(2, '0') + '/' + mes.toString().padStart(2, '0') + '/' + ano;

// fecth para gráfico
async function coronaVirus() {
    const res = await fetch('https://pomber.github.io/covid19/timeseries.json');
    const data = await res.json();

    const dataMortes = [];
    data.Brazil.forEach((item, i) => {
        dataMortes.unshift(converterData(data.Brazil[i].date));
    });

    const totalMortesBrasil = [];
    data.Brazil.forEach((item, i) => {
        totalMortesBrasil.unshift(data.Brazil[i].deaths);
    });

    const totalMortesItalia = [];
    data.Italy.forEach((item, i) => {
        totalMortesItalia.unshift(data.Italy[i].deaths);
    });

    const totalMortesChina = [];
    data.China.forEach((item, i) => {
        totalMortesChina.unshift(data.China[i].deaths);
    });

    const totalMortesUS = [];
    data.US.forEach((item, i) => {
        totalMortesUS.unshift(data.US[i].deaths);
    });

    const dados = [
        dataMortes.reverse(),
        totalMortesBrasil.reverse(),
        totalMortesItalia.reverse(),
        totalMortesChina.reverse(),
        totalMortesUS.reverse(),
    ]
    return dados;
}

async function handleResults(mortes) {
    const mortesBrasil = await Promise.resolve(mortes);

    Chart.defaults.global.elements.line.borderWidth = 6;
    Chart.defaults.global.elements.point.borderWidth = 10;
    Chart.defaults.global.elements.point.hoverBorderWidth = 10;
    // Chart.defaults.global.defaultFontSize = 40;

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: mortesBrasil[0],
            datasets: [{
                label: 'Brasil',
                backgroundColor: 'transparent',
                borderColor: '#006d1c',
                data: mortesBrasil[1],
            }, {
                label: 'China',
                backgroundColor: 'transparent',
                borderColor: '#f00',
                data: mortesBrasil[3],
            }, {
                label: 'Estados Unidos',
                backgroundColor: 'transparent',
                borderColor: '#00f',
                data: mortesBrasil[4],
            }, {
                label: 'Itália',
                backgroundColor: 'transparent',
                borderColor: 'orange',
                data: mortesBrasil[2],
            }]
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Total de Mortos',
                        fontColor: '#000',
                    },
                    gridLines: {
                        color: '#ccc',
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Dias',
                        fontColor: '#000',
                    },
                    gridLines: {
                        color: '#ccc',
                    }
                }]
            },
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false,
                caretSize: 20,
            },
            title: {
                display: true,
                text: 'Mortes por Coronavírus',
                fontSize: 50,
                fontColor: '#f00',
            },
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    fontColor: '#000',
                }
            }
        }
    });
}
handleResults(coronaVirus());



// barra:
var ctx = document.getElementById('2myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});