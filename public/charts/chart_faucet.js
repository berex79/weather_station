//document.getElementById("row3").style.visibility = "hidden";
document.getElementById("analytics_title").innerHTML = "Drip Faucet Chart Analytics"

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



//--- Drip Deposits Line Chart -----------------------------------------------------------------------------------
$.get('/faucetDBAPI', function(arg) {
    let faucetDripDeposit = []
    let faucetUSDDeposit = []
    let faucetDBUpdateDate = []

    for (let i = 0; i < Object.keys(arg).length; i++) {    
        faucetDripDeposit[i] = arg[i].faucetDripDeposit
        faucetUSDDeposit[i] = arg[i].faucetDripDepositUSD
        faucetDBUpdateDate[i] = arg[i].faucetDBUpdateDate
    } 

    const ctx = document.getElementById('chart1');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: faucetDBUpdateDate ,
            datasets: [
                {
                    label: 'TOTAL DRIP DEPOSITS',
                    data: faucetDripDeposit,
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
                },
                {
                    label: 'TOTAL USD DEPOSITS',
                    data: faucetUSDDeposit,
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
        options: chartOptions,
    });
});

//--- Drip Referral Line Chart -----------------------------------------------------------------------------------                     
$.get('/faucetDBReferralsAPI', function(arg) {
    let faucetRefdirect = []
    let faucetRefStruct = []
    let faucetDBUpdateDate = []

    for (let i = 0; i < Object.keys(arg).length; i++) {    
        faucetRefdirect[i] = arg[i].faucetRefdirect
        faucetRefStruct[i] = arg[i].faucetRefStruct
        faucetDBUpdateDate[i] = arg[i].faucetDBUpdateDate
    }

    const ctx = document.getElementById('chart2');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: faucetDBUpdateDate ,
            datasets: [
                {
                    label: 'DIRECT REFERRALS',
                    data: faucetRefdirect,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)'
            
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 2
                },
                {
                    label: 'INDIRECT REFERRALS',
                    data: faucetRefStruct,
                    backgroundColor: [
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2
                }
            ]
        },
        options: {
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
});


//--- DRIP FACUET DAILY DIVS -----------------------------------------------------------------------------------                     
$.get('/faucetDailyDivs', function(arg) {
    let faucetDailyDivs = []
    let faucetDailyDivsUSD = []
    let faucetDBUpdateDate = []

    for (let i = 0; i < Object.keys(arg).length; i++) {    
        faucetDailyDivs[i] = arg[i].faucetDailyDivs
        faucetDailyDivsUSD[i] = arg[i].faucetDailyDivsUSD
        faucetDBUpdateDate[i] = arg[i].faucetDBUpdateDate
        console.log(arg)
    }

    const ctx = document.getElementById('chart4');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: faucetDBUpdateDate ,
            datasets: [
                {
                    label: 'DAILY DIVS',
                    data: faucetDailyDivs,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)'
            
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 2
                },
                {
                    label: 'DAILY DIVS USD',
                    data: faucetDailyDivsUSD,
                    backgroundColor: [
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2
                }
            ]
        },
        options: {
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
});

//--- Faucet Info Line Chart -----------------------------------------------------------------------------------                     
$.get('/faucetDBInfoAPI', function(arg) {
    let faucetTotalUsers = []
    let faucetDripSupply = []
    let faucetdripDEXPrice = []
    let faucetdripPCSPrice = []
    let faucetDBUpdateDate = []

    for (let i = 0; i < Object.keys(arg).length; i++) {    
        faucetDBUpdateDate[i] = arg[i].faucetDBUpdateDate
        faucetTotalUsers[i] = arg[i].faucetTotalUsers
        faucetDripSupply[i] = arg[i].faucetDripSupply
        faucetdripDEXPrice[i] = arg[i].faucetdripDEXPrice
        faucetdripPCSPrice[i] = arg[i].faucetdripPCSPrice
    }

    const ctx1 = document.getElementById('chart6');
    const myChart1 = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: faucetDBUpdateDate ,
            datasets: [
                {
                    label: 'DRIP DEX PRICE',
                    data: faucetdripDEXPrice,
                    backgroundColor: [
                        'rgba(255, 205, 86, 1)'
            
                    ],
                    borderColor: [
                        'rgba(255, 205, 86, 1)'
                    ],
                    borderWidth: 2
                },
                {
                    label: 'DRIP PCS PRICE',
                    data: faucetdripPCSPrice,
                    backgroundColor: [
                        'rgba(255, 67, 50, 0.8)'
                    ],
                    borderColor: [
                        'rgba(255, 67, 50, 0.8)'
                    ],
                    borderWidth: 2
                }
            ]
        },
        options: chartOptions,
    })

    let ctx2 = document.getElementById('chart5');
    let myChart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: faucetDBUpdateDate,
            datasets: [
                {
                    label: 'TOTAL USERS',
                    data: faucetTotalUsers,
                    backgroundColor: [
                        'rgba(153, 102, 255, 1)'
                                        
                    ],
                    borderColor: [
                        'rgba(153, 102, 255,1)'
                    ],
                    borderWidth: 2
                },
                {
                    label: 'TOTAL SUPPLY',
                    data: faucetDripSupply,
                    backgroundColor: [
                        'rgba(201, 203, 207, 1)'
                    ],
                    borderColor: [
                        'rgba(201, 203, 207, 1)'
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
                        color: "#c9caca"
                    },
                    gridLines: {
                        display: true,
                        color: "rgba(255,99,132,0.2)"
                    }
                }
            },
    }
    })
})


//--- Drip Account Deposits Bar Chart -----------------------------------------------------------------------------------                 

$.get('/faucetDBAccountDepositsAPI', function(arg) {
    let walletAccount = []
    let faucetDripDeposit = []
    let faucetDripDepositUSD = []

    for (let i = 0; i < Object.keys(arg).length; i++) {    
        walletAccount[i] = arg[i].walletAccount
        faucetDripDeposit[i] = arg[i].faucetDripDeposit
        faucetDripDepositUSD[i] = arg[i].faucetDripDepositUSD
    }
    
    const ctx4 = document.getElementById('chart3');
    const myChart4 = new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: ['SI1','SI2','BM','WC1','WC2','ILU1','ILU2',],
            datasets: [{
                label: 'DEPOSITS (DRIP)',
                data: faucetDripDeposit,
                backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 205, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255,1)',
                'rgba(201, 203, 207,1)'
                ],
                borderColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
                ],
                borderWidth: 1
            },
            {
                label: 'DEPOSITS (USD)',
                data: faucetDripDepositUSD,
                backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 205, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255,1)',
                'rgba(201, 203, 207,1)'
                ],
                borderColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
                ],
                borderWidth: 1
            }
            ]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        color: "#c9caca"
                    }
                },
                y: {
                    ticks: {
                        color: "#c9caca"
                    }
                }
            }
        }
    });
})

