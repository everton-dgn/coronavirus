// função para converter data
function converterData(dataPar) {
    const dataRecebida = dataPar.replace('-', '/').replace('-', '/').replace('T', ' ').split(' ');
    const dataTratada = dataRecebida[0].split('/');
    const dataAtual = dataTratada[2].padStart(2, '0') + '/' + dataTratada[1].padStart(2, '0') + '/' + dataTratada[0];

    return dataAtual;
}

// Fornece dados dos países para alimentar os gráficos //
async function mortesPorPais() {
    const resposta = await fetch('https://pomber.github.io/covid19/timeseries.json');
    const data = await resposta.json();

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
            data.Brazil[49].deaths,
            data.Brazil[69].deaths,
            data.Brazil[99].deaths,
            data.Brazil[129].deaths,
            data.Brazil[data.Brazil.length - 1].deaths,
        ],
        [
            data.China[9].deaths,
            data.China[49].deaths,
            data.China[69].deaths,
            data.China[99].deaths,
            data.China[129].deaths,
            data.China[data.Brazil.length - 1].deaths,
        ],
        [
            data.US[9].deaths,
            data.US[49].deaths,
            data.US[69].deaths,
            data.US[99].deaths,
            data.US[129].deaths,
            data.US[data.Brazil.length - 1].deaths,
        ],
        [
            data.Italy[9].deaths,
            data.Italy[49].deaths,
            data.Italy[69].deaths,
            data.Italy[99].deaths,
            data.Italy[129].deaths,
            data.Italy[data.Brazil.length - 1].deaths,
        ],
        [
            data.Spain[9].deaths,
            data.Spain[49].deaths,
            data.Spain[69].deaths,
            data.Spain[99].deaths,
            data.Spain[129].deaths,
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

// imprime gráficos com dados da api //
async function imprimirGraficos(mortes) {
    const mortesBrasil = await Promise.resolve(mortes);

    Chart.defaults.global.defaultFontFamily = "'Poppins', monospace, sans-serif";
    // Chart.defaults.global.elements.line.borderWidth = 3;
    // Chart.defaults.global.elements.point.borderWidth = 3;
    // Chart.defaults.global.elements.point.hoverBorderWidth = 10;
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
                backgroundColor: '#006d1c',
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
                backgroundColor: '#f00',
                borderColor: '#f00',
                data: mortesBrasil[3],
            }, {
                label: 'Estados Unidos',
                backgroundColor: '#00f',
                borderColor: '#00f',
                data: mortesBrasil[4],
            }, {
                label: 'Itália',
                backgroundColor: 'orange',
                borderColor: 'orange',
                data: mortesBrasil[2],
            }, {
                label: 'Espanha',
                backgroundColor: 'blueviolet',
                borderColor: 'blueviolet',
                data: mortesBrasil[7],
            }]
        },

        // Configuration options go here
        options: {
            maintainAspectRatio: false,
            elements: {
                line: {
                    borderWidth: 2,
                    fill: false,
                    // tension: 0 // define se a linha é reta ou curva
                },
                point: {
                    radius: 0,
                    // backgroundColor: 'blue',
                    // borderWidth
                    // borderColor
                    hoverBackgroundColor: '#fff',
                    hoverBorderWidth: 3,
                    hoverRadius: 3,
                    hitRadius: 11 // raio extra pra detecção do hover no ponto
                }
            },
            scales: {
                yAxes: [{
                    // display: false,
                    color: 'blue',
                    ticks: {
                        // fontStyle: "bold",
                        // fontColor: "#red", // cor dos valores eixo y
                        beginAtZero: true,
                        stepSize: 5000,
                        padding: 5,
                        // max: 100,
                        // min: 0
                    },
                    scaleLabel: {
                        // display: true,
                        labelString: 'Total de Mortes',
                        fontColor: '#000',
                    },
                    gridLines: {
                        drawBorder: true,
                        color: '#ccc',
                        zeroLineColor: '#000', // cor do eixo
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
                        // maxTicksLimit: 6 // limite de linhas guias exibidas
                        // max: 100,
                        // min: 0
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Dias',
                        fontColor: '#000',
                    },
                    gridLines: {
                        drawBorder: true,
                        color: '#ccc',
                        zeroLineColor: 'red',
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
                callbacks: {
                    // title: function(data) { // apaga titulo do tooltip
                    //     return '';
                    // },
                    label: function (tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel.toLocaleString('pt-BR');
                    }
                },
                // backgroundColor
                titleFontSize: 14,
                // titleFontColor
                // titleAlign
                titleMarginBottom: 10,
                bodySpacing: 8,
                xPadding: 10,
                yPadding: 10,
                mode: 'index',
                intersect: false,
                caretSize: 5,
                bodyFontSize: 14,
                // position: 'nearest',
                caretPadding: 20,
                cornerRadius: 4,
                // borderColor
                // borderWidth
            },
            title: {
                display: false,
                text: 'Total de mortos por Coronavírus ao dia',
                fontSize: 50,
                fontColor: '#f00',
            },
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    fontColor: '#000',
                    boxWidth: 12,
                },
                position: 'bottom'
            }
        }
    });

    // barra:
    const ctx2 = document.getElementById('2myChart').getContext('2d');
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO'],
            datasets: [{
                    label: 'Brasil',
                    data: mortesBrasil[5][0],
                    backgroundColor: [
                        'green', 'green', 'green', 'green', 'green', 'green'
                    ],
                    borderColor: 'green',
                },
                {
                    label: 'China',
                    data: mortesBrasil[5][1],
                    backgroundColor: [
                        'red', 'red', 'red', 'red', 'red', 'red'
                    ],
                    borderColor: 'red',
                    // borderColor: '#000',
                    // borderWidth: 6,
                    // hoverBorderColor : 'blue'
                },
                {
                    label: 'Estados Unidos',
                    data: mortesBrasil[5][2],
                    backgroundColor: [
                        'blue', 'blue', 'blue', 'blue', 'blue', 'blue'
                    ],
                    borderColor: 'blue',
                },
                {
                    label: 'Itália',
                    data: mortesBrasil[5][3],
                    backgroundColor: [
                        'orange', 'orange', 'orange', 'orange', 'orange', 'orange'
                    ],
                    borderColor: 'orange',
                },
                {
                    label: 'Espanha',
                    data: mortesBrasil[5][4],
                    backgroundColor: [
                        'blueviolet', 'blueviolet', 'blueviolet', 'blueviolet', 'blueviolet', 'blueviolet'
                    ],
                    borderColor: 'blueviolet',
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                labels: {
                    render: 'value',
                    // macete pra n~eo exibir valores acima das barras:
                    fontColor: ['transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent'],
                    precision: 2,
                },
            },
            scales: {
                yAxes: [{
                    // display: false,
                    color: 'blue',
                    ticks: {
                        beginAtZero: true,
                        stepSize: 5000,
                        padding: 5,
                    },
                    gridlines: {
                        drawOnChartArea: true,
                        drawBorder: true,
                        color: '#ccc',
                        zeroLineColor: "red",
                        tickMarkLength: 0,
                    },
                    scaleLabel: {
                        // display: true,
                        labelString: 'Total de Mortes',
                        fontColor: '#000',
                    },
                }],
                xAxes: [{
                    // display: false,
                    ticks: {
                        beginAtZero: true,
                        padding: 10,
                        maxTicksLimit: 6 // limite de linhas guias exibidas
                        // max: 100,
                        // min: 0
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Mês',
                        fontColor: '#000',
                    },
                    gridLines: {
                        // zeroLineWidth: 3,
                        drawBorder: true,
                        drawOnChartArea: true,
                        color: '#ccc',
                        zeroLineColor: "red",
                        tickMarkLength: 0, // linha guia pra fora do eixo
                        // zeroLineColor: "#000",
                        // zeroLineWidth: 2
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    // title: function(data) { // apaga titulo do tooltip
                    //     return '';
                    // },
                    label: function (tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel.toLocaleString('pt-BR');
                    }
                },
                mode: 'index',
                bodySpacing: 8,
                intersect: false,
                titleMarginBottom: 10,
                caretSize: 5,
                bodyFontSize: 14,
                titleFontSize: 14,
                xPadding: 10,
                yPadding: 10,
                caretPadding: 20,
                cornerRadius: 4,
            },
            title: {
                display: false,
                text: 'Total de mortos por Coronavírus ao Mês',
                fontSize: 50,
                fontColor: '#f00',
            },
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    fontColor: '#000',
                    boxWidth: 12,
                },
                position: 'bottom'
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
                borderColor: [
                    'green', 'red', 'blue', 'orange', 'blueviolet'
                ],
                borderAlign: 'inner',
                // borderColor: ['#000', 'green', 'red', 'blue']
                // borderWidth: 10,
                // hoverBackgroundColor: 'red'
                hoverBorderColor: '#fff',
                hoverBorderWidth: 4,
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                labels: [{
                        render: function (args) {
                            // args will be something like
                            return args.value + '%';
                        },
                        fontColor: ['white', 'white', 'white', 'white', 'white'],
                        precision: 2,
                        fontSize: 16,
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
                    }
                    /* ,
                                    {
                                        render: 'label',
                                        position: 'outside',
                                        fontSize: 16,
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
                                    } */
                ],
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
                // titleMarginBottom: 10,
                caretPadding: 20,
                cornerRadius: 4,
                xPadding: 10,
                yPadding: 10,
                caretSize: 5,
                bodyFontSize: 14,
                titleFontSize: 14,
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
                display: false,
                text: 'Taxa % de mortalidade',
                fontSize: 50,
                fontColor: '#f00',
            },
            legend: {
                display: true,
                labels: {
                    // This more specific font property overrides the global property
                    fontColor: '#000',
                    padding: 10, // espaço entre itens da legenda
                    fontSize: 12,
                    boxWidth: 12,
                    usePointStyle: true
                },
                position: 'bottom'
            }
        }
    });
}
imprimirGraficos(mortesPorPais());