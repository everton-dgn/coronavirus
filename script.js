const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// exibe dados do covid-19 do Brasil e do mundo no topo do site
fetch('https://corona-stats.online/brazil?format=json')
    .then(r => r.json())
    .then(data => {
        // Brasil:
        $('[data-date]').innerHTML = hoje;
        $('[data-confirmed]').innerHTML = data.data[0].confirmed.toLocaleString('pt-BR');
        $('[data-hoje]').innerHTML = data.data[0].todayDeaths.toLocaleString('pt-BR');
        $('[data-novos]').innerHTML = data.data[0].todayCases.toLocaleString('pt-BR');
        $('[data-deaths]').innerHTML = data.data[0].deaths.toLocaleString('pt-BR');
        $('[data-mortalidade]').innerHTML = parseFloat((data.data[0].deaths * 100 / data.data[0].confirmed).toFixed(1)) + '%';

        // Mundo:
        $('[data-mundo-confirmed]').innerHTML = data.worldStats.confirmed.toLocaleString('pt-BR');
        $('[data-mundo-hoje]').innerHTML = data.worldStats.todayDeaths.toLocaleString('pt-BR');
        $('[data-mundo-novos]').innerHTML = data.worldStats.todayCases.toLocaleString('pt-BR');
        $('[data-mundo-deaths]').innerHTML = data.worldStats.deaths.toLocaleString('pt-BR');
        $('[data-mundo-mortalidade]').innerHTML = parseFloat((data.worldStats.deaths * 100 / data.worldStats.confirmed).toFixed(1)) + '%';
    });

// mostra data atual:
const agora = new Date();
const dia = agora.getDate();
const mes = agora.getUTCMonth() + 1;
const ano = agora.getUTCFullYear();
const hoje = dia.toString().padStart(2, '0') + '/' + mes.toString().padStart(2, '0') + '/' + ano;

// função para converter data
function converterData(dataPar) {
    const dataRecebida = dataPar.replace('-', '/').replace('-', '/').replace('T', ' ').split(' ');
    const dataTratada = dataRecebida[0].split('/');
    const dataAtual = dataTratada[2].padStart(2, '0') + '/' + dataTratada[1].padStart(2, '0') + '/' + dataTratada[0];

    return dataAtual;
}

// tabela
fetch("https://covid19-brazil-api.now.sh/api/report/v1")
    .then(response => response.json())
    .then(data => {
        //cria tabela do estado com atributo title para uso do mapa svg:
        data.data.forEach((item) => {
            $('[data-estado-altura]').innerHTML += '<tr title="' + item.state + '"><td>' + item.state + '</td>' + '<td>' + item.cases.toLocaleString('pt-BR') + '</td>' + '<td>' + item.deaths.toLocaleString('pt-BR') + '</td>' + '<td>' + parseFloat((item.deaths * 100 / item.cases).toFixed(1)) + '%' + '</td>' + '</tr>';
        });

        // click no estado do mapa exibe dados do estado :
        $$('a').forEach(item => item.addEventListener('click', estadosBrasileiros));

        function estadosBrasileiros(e) {
            e.preventDefault();
            const nomedoEstado = this.getAttribute("title");
            $('[data-info-mapa] h1').innerHTML = nomedoEstado;

            for (let i = 1; i < 28; i++) {
                $$('#tabelaEstado tr')[i].getAttribute('title');
                if ($$('#tabelaEstado tr')[i].getAttribute('title') == nomedoEstado) {
                    $('[data-info-mapa] table thead').innerHTML = $$('#tabelaEstado thead')[0].innerHTML + $$('#tabelaEstado tbody')[i - 1].innerHTML;
                }
            }
        }
    });

// fecth para gráfico
async function coronaVirus2() {
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

    const totalMortesSpain = [];
    data.Spain.forEach((item, i) => {
        totalMortesSpain.unshift((data.Spain[i].deaths));
    });

    let totalMortesMundo = 0;
    for (let i = 0; i < 184; i++) {
        totalMortesMundo += Object.entries(data)[i][1][data.Brazil.length - 1].deaths;
    }

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
        ],
        [
            data.Spain[9].deaths,
            data.Spain[29].deaths,
            data.Spain[69].deaths,
            data.Spain[data.Brazil.length - 1].deaths,
        ]
    ];

    const morteTaxaPaises = [
        parseFloat((data.Brazil[data.Brazil.length - 1].deaths * 100 / data.Brazil[data.Brazil.length - 1].confirmed).toFixed(1)),
        parseFloat((data.China[data.China.length - 1].deaths * 100 / data.China[data.China.length - 1].confirmed).toFixed(1)),
        parseFloat((data.US[data.US.length - 1].deaths * 100 / data.US[data.US.length - 1].confirmed).toFixed(1)),
        parseFloat((data.Italy[data.Italy.length - 1].deaths * 100 / data.Italy[data.Italy.length - 1].confirmed).toFixed(1)),
        parseFloat((data.Spain[data.Spain.length - 1].deaths * 100 / data.Spain[data.Spain.length - 1].confirmed).toFixed(1))
    ]

    const dados = [
        dataMortes.reverse(), // são arrays retornados do forEach
        totalMortesBrasil.reverse(),
        totalMortesItalia.reverse(),
        totalMortesChina.reverse(),
        totalMortesUS.reverse(),
        morteMes,
        morteTaxaPaises,
        totalMortesSpain.reverse()
    ]
    return dados;
}

async function handleResults(mortes) {
    const mortesBrasil = await Promise.resolve(mortes);

    Chart.defaults.global.elements.line.borderWidth = 3;
    Chart.defaults.global.elements.point.borderWidth = 3;
    Chart.defaults.global.elements.point.hoverBorderWidth = 10;
    // Chart.defaults.global.defaultFontSize = 10;
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
            }, {
                label: 'Espanha',
                backgroundColor: 'transparent',
                borderColor: 'blueviolet',
                data: mortesBrasil[7],
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
                        stepSize: 3000,
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
                        maxTicksLimit: 10 // limite de linhas guias exibidas
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
                // exibe o valor do tooltip com porcentagem
                // callbacks: {
                //     title: function() {
                //         return '';
                //     },
                //     label: function(tooltipItem, data) {
                //         return tooltipItem.yLabel + " %";
                //     }
                // },
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
            },
            {
                label: 'Espanha',
                data: mortesBrasil[5][4],
                backgroundColor: [
                    'blueviolet', 'blueviolet', 'blueviolet', 'blueviolet'
                ]
            }]
        },
        options: {
            plugins: {
                labels: {
                    render: 'value',
                    // fontColor: ['green', 'white', 'red', 'blue'],
                    precision: 2,
                }
            },
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

    // doughnut:
    const ctx3 = document.getElementById('3myChart').getContext('2d');
    // deixa tooltip fixo só o valor sendo exibido:
    // Chart.pluginService.register({
    //     beforeRender: function (chart) {
    //         if (chart.config.options.showAllTooltips) {
    //             chart.pluginTooltips = [];
    //             chart.config.data.datasets.forEach(function (dataset, i) {
    //                 chart.getDatasetMeta(i).data.forEach(function (sector, j) {
    //                     chart.pluginTooltips.push(new Chart.Tooltip({
    //                         _chart: chart.chart,
    //                         _chartInstance: chart,
    //                         _data: chart.data,
    //                         _options: chart.options.tooltips,
    //                         _active: [sector]
    //                     }, chart));
    //                 });
    //             });
    //             chart.options.tooltips.enabled = false;
    //         }
    //     },
    //     afterDraw: function (chart, easing) {
    //         if (chart.config.options.showAllTooltips) {
    //             if (!chart.allTooltipsOnce) {
    //                 if (easing !== 1)
    //                     return;
    //                 chart.allTooltipsOnce = true;
    //             }

    //             chart.options.tooltips.enabled = true;
    //             Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
    //                 tooltip.initialize();
    //                 tooltip.update();
    //                 tooltip.pivot();
    //                 tooltip.transition(easing).draw();
    //             });
    //             chart.options.tooltips.enabled = false;
    //         }
    //     }
    // });

    new Chart(ctx3, {
        type: 'pie', // ou doughnut 
        data: {
            labels: ['Brasil', 'China', 'Estados Unidos', 'Itália', 'Espanha'],
            datasets: [{
                data: mortesBrasil[6],
                backgroundColor: [
                    'green', 'red', 'blue', 'orange', 'blueviolet'
                ],
                borderAlign: 'inner',
                // borderColor: ['#000', 'green', 'red', 'blue']
                // borderWidth: 10,
                // hoverBackgroundColor hoverBorderColor hoverBorderWidth
            }]
        },
        options: {
            plugins: {
                labels: [{
                    render: function (args) {
                        // args will be something like
                        return args.value + '%';
                    },
                    fontColor: ['white', 'white', 'white', 'white', 'white'],
                    precision: 2,
                    fontSize: 30,
                    fontStyle: 'bold',
                    // draw text shadows under labels, default is false
                    textShadow: true,
                    // text shadow intensity, default is 6
                    shadowBlur: 9,
                    // text shadow X offset, default is 3
                    shadowOffsetX: 0,
                    // text shadow Y offset, default is 3
                    shadowOffsetY: 0,
                    // text shadow color, default is 'rgba(0,0,0,0.3)'
                    shadowColor: '#000',
                },
                {
                    render: 'label',
                    position: 'outside',
                    fontSize: 36,
                    fontColor: '#000',
                    fontStyle: 'bold',
                    // draw text shadows under labels, default is false
                    textShadow: true,
                    // text shadow intensity, default is 6
                    shadowBlur: 9,
                    // text shadow X offset, default is 3
                    shadowOffsetX: 0,
                    // text shadow Y offset, default is 3
                    shadowOffsetY: 0,
                    // text shadow color, default is 'rgba(0,0,0,0.3)'
                    shadowColor: '#fff',
                }],
                // identifies whether or not labels of value 0 are displayed, default is false
                showZero: true,
            },
            cutoutPercentage: 40, // bola do centro do gráfico
            rotation: 10, // ângulo de rotação do gráfico
            showAllTooltips: true,
            animation: {
                animateRotate: true,
                animateScale: true
            },
            tooltips: {
                // enabled: false,
                // intersect: true,
                caretSize: 30,
                bodyFontSize: 30,
                // retorna valor e titulo dentro do tooltip e põe simbolo de %:
                callbacks: {
                    title: function () {
                        return '';
                    },
                    label: function (tooltipItem, data) {
                        var label = data.labels[tooltipItem.index];
                        return label + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + '%';
                    }
                },
                /* // deixa tooltip fixo só o valor sendo exibido e é possivel passar texto concatenando com o return(ex: %):
                callbacks: {
                    title: function (tooltipItems, data) {
                        return '';
                    },
                    label: function (tooltipItem, data) {
                        var datasetLabel = '';
                        var label = data.labels[tooltipItem.index];
                        return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    }
                } */
            },
            title: {
                display: true,
                text: 'Taxa % de mortalidade',
                fontSize: 50,
                fontColor: '#f00',
            },
            legend: {
                display: false,
                labels: {
                    // This more specific font property overrides the global property
                    fontColor: '#000',
                    padding: 60, // espaço entre itens da legenda
                    fontSize: 25,
                }
            }
        }
    });
}
handleResults(coronaVirus2());

// cria tabela cidade:
fetch("https://api.coronaanalytic.com/journal")
    .then(response => response.json())
    .then(({ values }) => {
        let cidades = values.map((el) => el.citys).flat();
        cidades.forEach(item => {
            $('[data-cidade-altura]').innerHTML += '<tr><td>' + item.city + '</td>' + '<td>' + item.cases.toLocaleString('pt-BR') + '</td></tr>'
        });

    });

// cria tabela país:
fetch("https://corona-stats.online/?format=json")
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < 184; i++) {
            $('[data-pais-altura]').innerHTML += '<tr><td><img src="' + data.data[i].countryInfo.flag + '" width="30"></td>' + '<td>' + data.data[i].country + '</td>' + '<td>' + data.data[i].confirmed.toLocaleString('pt-BR') + '</td>' + '<td>' + data.data[i].deaths.toLocaleString('pt-BR') + '</td>' + '<td>' + parseFloat((data.data[i].deaths * 100 / data.data[i].confirmed).toFixed(1)) + '%' + '</td></tr>';
        }

    });

// Pesquisar país, estado e cidade nas tabelas:
function filtroPesquisa(inputFilter, tableFilter) {
    $(inputFilter).addEventListener("keyup", () => {
        var valor = $(inputFilter).value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        Array.from($$(tableFilter)).filter((item) => {
            if (item.innerText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(valor) > -1)
                item.style.display = '';
            else
                item.style.display = 'none';
        });
    });
}
filtroPesquisa("#pesquisarPais", "#tabelaPais tbody tr");
filtroPesquisa("#pesquisarEstado", "#tabelaEstado tbody tr");
filtroPesquisa("#pesquisarCidade", "#tabelaCidade tbody tr");
