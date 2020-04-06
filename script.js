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
            $('[data-tabela]').innerHTML += '<tr title="' + item.state + '"><td>' + item.state + '</td>' + '<td>' + item.cases.toLocaleString('pt-BR') + '</td>' + '<td>' + item.deaths.toLocaleString('pt-BR') + '</td>' + '<td>' + item.suspects.toLocaleString('pt-BR') + '</td>' + '<td>' + Math.ceil(item.deaths * 100 / item.cases) + '%' + '</td>' + '</tr>';
        });

        // click no estado do mapa exibe dados do estado :
        $$('a').forEach(item => item.addEventListener('click', estadosBrasileiros));

        function estadosBrasileiros(e) {
            e.preventDefault();
            const nomedoEstado = this.getAttribute("title");
            $('[data-info-mapa] h1').innerHTML = nomedoEstado;

            for (let i = 1; i < 28; i++) {
                $$('tr')[i].getAttribute('title');
                if ($$('tr')[i].getAttribute('title') == nomedoEstado) {
                    $('[data-info-mapa] table').innerHTML = '<tr>' + $$('tr')[0].innerHTML + '</tr>' + '<tr>' + $$('tr')[i].innerHTML + '</tr>';
                }
                console.log($$('tr')[i].innerHTML);
            }
        }
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
        dataMortes.unshift(converterData(data.Brazil[i].date).slice(0, 5));
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
        totalMortesUS.unshift((data.US[i].deaths));
    });

    const morteMes = [
        [
            data.Brazil[9].deaths,
            data.Brazil[29].deaths,
            data.Brazil[69].deaths,
            data.Brazil[data.Brazil.length - 1].deaths,
        ],
        [
            data.China[9].deaths,
            data.China[29].deaths,
            data.China[69].deaths,
            data.China[data.Brazil.length - 1].deaths,
        ],
        [
            data.US[9].deaths,
            data.US[29].deaths,
            data.US[69].deaths,
            data.US[data.Brazil.length - 1].deaths,
        ],
        [
            data.Italy[9].deaths,
            data.Italy[29].deaths,
            data.Italy[69].deaths,
            data.Italy[data.Brazil.length - 1].deaths,
        ]
    ]

    const dados = [
        dataMortes.reverse(), // são arrays retornados do forEach
        totalMortesBrasil.reverse(),
        totalMortesItalia.reverse(),
        totalMortesChina.reverse(),
        totalMortesUS.reverse(),
        morteMes
    ]
    return dados;
}

async function handleResults(mortes) {
    const mortesBrasil = await Promise.resolve(mortes);

    Chart.defaults.global.elements.line.borderWidth = 3;
    Chart.defaults.global.elements.point.borderWidth = 3;
    Chart.defaults.global.elements.point.hoverBorderWidth = 10;
    Chart.defaults.global.defaultFontSize = 20;
    Chart.defaults.global.responsive = true;
    // Chart.defaults.global.tooltips.mode = 'label';
    // Chart.defaults.global.tooltips.backgroundColor = '#fff';
    // Chart.defaults.global.tooltips.titleColor = '#888';
    // Chart.defaults.global.tooltips.bodyColor = '#888';
    // Chart.defaults.global.animation.duration = 1500;
    // Chart.defaults.global.animation.easing = 'easeInOutQuart';

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
                // borderColor: "rgba(220,220,220,1)",
                // pointBorderColor: "rgba(220,220,220,1)",
                // pointBackgroundColor: "#222",
                // pointBorderWidth: 1,
                // pointHoverRadius: 5,
                // pointHoverBackgroundColor: "rgba(220,220,220,1)",
                // pointHoverBorderColor: "rgba(220,220,220,1)",
                // pointHoverBorderWidth: 2,
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
            elements: {
                line: {
                    tension: 0 // define se a linha é reta ou curva
                }
            },
            scales: {
                yAxes: [{
                    display: true,
                    color: 'blue',
                    ticks: {
                        // fontStyle: "bold",
                        // fontColor: "#red", // cor dos valores eixo y
                        beginAtZero: true,
                        stepSize: 1000,
                        padding: 10,
                        // max: 100,
                        // min: 0
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Total de Mortos',
                        fontColor: '#000',
                    },
                    gridLines: {
                        color: '#ccc',
                        zeroLineColor: "#000", // cor do eixo
                        // lineWidth: 22 // expessura da linha guia horizontal
                        tickMarkLength: 0, // linha guia pra fora do eixo
                        // z: 0 // z-index of gridline layer. Values <= 0 are drawn under datasets, > 0 on top.
                    }
                }],
                xAxes: [{
                    // display: false,
                    ticks: {
                        beginAtZero: true,
                        padding: 10,
                        // maxTicksLimit: 20 // limite de linhas guias exibidas
                        // max: 100,
                        // min: 0
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Dias',
                        fontColor: '#000',
                    },
                    gridLines: {
                        color: '#ccc',
                        zeroLineColor: "red",
                        tickMarkLength: 0, // linha guia pra fora do eixo
                        // zeroLineColor: "#000",
                        // zeroLineWidth: 2
                    }
                }]
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                caretSize: 20,
            },
            title: {
                display: true,
                text: 'Total de mortos por Coronavírus ao dia',
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

    // barra:
    const ctx2 = document.getElementById('2myChart').getContext('2d');
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril'],
            datasets: [{
                label: 'Brasil',
                data: mortesBrasil[5][0],
                backgroundColor: [
                    'green', 'green', 'green', 'green'
                ]
            },
            {
                label: 'China',
                data: mortesBrasil[5][1],
                backgroundColor: [
                    'red', 'red', 'red', 'red'
                ],
                // borderColor: '#000',
                // borderWidth: 6,
                // hoverBorderColor : 'blue'
            },
            {
                label: 'Estados Unidos',
                data: mortesBrasil[5][2],
                backgroundColor: [
                    'blue', 'blue', 'blue', 'blue'
                ]
            },
            {
                label: 'Itália',
                data: mortesBrasil[5][3],
                backgroundColor: [
                    'orange', 'orange', 'orange', 'orange'
                ]
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
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
                text: 'Total de mortos por Coronavírus ao Mês',
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



