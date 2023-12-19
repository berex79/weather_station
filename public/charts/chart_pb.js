document.getElementById("row3").style.visibility = "hidden";
document.getElementById("analytics_title").innerHTML = "Piggy Bank Chart Analytics"

var chartOptions =  {
    legend: {
        labels: {
            fontColor: "blue",
            fontSize: 18
        }
    },
    scales: {
        x: {
            type: 'time',
            time: {
                displayFormats: {
                    day: 'DD MMM YY'
                }
            },
            ticks: {
                color: "#c9caca"
            }
        },
        y: {
            ticks: {
                callback: function(val, index) {
                    // Hide every 2nd tick label
                    return '$' +  addCommas(val)
                },
                color: "#c9caca"
            },
            gridLines: {
                display: true,
                color: "rgba(255,99,132,0.2)"
            }
        }
    },
}



//--- Piglets Line Chart -----------------------------------------------------------------------------------
$.get('/pBDBAPI', function(arg) {
    let pBDBUpdateDate = []
    let pBpigletsUSD = []
    let pBmaxPayoutUSD = []

    for (let i = 0; i < Object.keys(arg).length; i++) {    
        pBpigletsUSD[i] = arg[i].pBpigletsUSD
        pBmaxPayoutUSD[i] = arg[i].pBmaxPayoutUSD
        pBDBUpdateDate[i] = arg[i].pBDBUpdateDate
    } 

    const ctx = document.getElementById('chart1');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: pBDBUpdateDate ,
            datasets: [
                {
                    label: 'PIGLETS (USD)',
                    data: pBpigletsUSD,
                    backgroundColor: [
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)'
                    ],
                    fontColor: [
                        "#c9caca"
                    ],
                    borderWidth: 2
                }
                
            ]
        },
        options: chartOptions
    })


    //---MAx Payout Line Chart -----------------------------------------------------------------------------------                     
    const ctx2 = document.getElementById('chart2');
    const myChart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: pBDBUpdateDate ,
            datasets: [
                {
                    label: 'MAX PAYOUT (USD)',
                    data: pBmaxPayoutUSD,
                    backgroundColor: [
                        'rgba(54, 162, 135, 1)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 135, 1)'
                    ],
                    borderWidth: 2
                }
            ]
        },
        options: chartOptions
    });
})

//--- Piglets Line Chart -----------------------------------------------------------------------------------
$.get('/pBInfoDBAPI', function(arg) {
    let pBDBUpdateDate = []
    let pBTVL = []
    let pBmarketPiglets = []
    let pBPigletUSDPrice = []

    for (let i = 0; i < Object.keys(arg).length; i++) {    
        pBTVL[i] = arg[i].pBTVL
        pBDBUpdateDate[i] = arg[i].pBDBUpdateDate
        pBmarketPiglets[i] = arg[i].pBmarketPiglets
        pBPigletUSDPrice[i] = (arg[i].pBPigletUSDPrice).toFixed(4)
    } 

    const ctx = document.getElementById('chart3');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: pBDBUpdateDate ,
            datasets: [
                {
                    label: 'TVL (USD)',
                    data: pBTVL,
                    backgroundColor: [
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 159, 64, 1)'
                    ],
                    fontColor: [
                        "#c9caca"
                    ],
                    borderWidth: 2
                }
                
            ]
        },
        options: chartOptions
    })


    //---MAx Payout Line Chart -----------------------------------------------------------------------------------                     
    const ctx2 = document.getElementById('chart4');
    const myChart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: pBDBUpdateDate ,
            datasets: [
                {
                    label: 'PIGLETS (USD)',
                    data: pBPigletUSDPrice,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    fontColor: [
                        "#c9caca"
                    ],
                    borderWidth: 2
                }
            ]
        },
        options:  {
            legend: {
                labels: {
                    fontColor: "blue",
                    fontSize: 18
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        displayFormats: {
                            day: 'DD MMM YY'
                        }
                    },
                    ticks: {
                        color: "#c9caca"
                    }
                },
                y: {
                    ticks: {
                        callback: function(val, index) {
                            // Hide every 2nd tick label
                            return '$' +  val.toFixed(4)
                        },
                        color: "#c9caca"
                    },
                    gridLines: {
                        display: true,
                        color: "rgba(255,99,132,0.2)"
                    }
                }
            },
        }
    });
})