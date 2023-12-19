document.getElementById("row3").style.visibility = "hidden";
document.getElementById("analytics_title").innerHTML = "Drip Garden Chart Analytics"

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
                color: "#c9caca"
            },
            gridLines: {
                display: true,
                color: "rgba(255,99,132,0.2)"
            }
        }
    },
}



//--- Total Plants Line Chart -----------------------------------------------------------------------------------
    $.get('/dGDBAPI', function(arg) {
        let dGDBUpdateDate = []
        let dGPlantsPerDay = []
        let dGPlantsPerDayUSDPrice = []
        let dGPlantsTotal = []
        let dGPlantsTotalUSDPrice = []


        for (let i = 0; i < Object.keys(arg).length; i++) {    
        dGPlantsTotal[i] = arg[i].dGPlantsTotal
        dGPlantsTotalUSDPrice[i] = arg[i].dGPlantsTotalUSDPrice
        dGPlantsPerDay[i] = arg[i].dGPlantsPerDay
        dGPlantsPerDayUSDPrice[i] = arg[i].dGPlantsPerDayUSDPrice
        dGDBUpdateDate[i] = arg[i].dGDBUpdateDate
        } 

        const ctx = document.getElementById('chart1');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dGDBUpdateDate ,
                datasets: [
                    {
                        label: 'TOTAL PLANTS',
                        data: dGPlantsTotal,
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
                        label: 'TOTAL PLANTS (USD)',
                        data: dGPlantsTotalUSDPrice,
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
        })


        //---Plants Per Day Line Chart -----------------------------------------------------------------------------------                     
    
        
        const ctx2 = document.getElementById('chart2');
        const myChart2 = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: dGDBUpdateDate ,
                datasets: [
                    {
                        label: 'PLANTS PER DAY',
                        data: dGPlantsPerDay,
                        backgroundColor: [
                            'rgba(255, 99, 132, 1)'
                
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)'
                        ],
                        borderWidth: 2
                    },
                    {
                        label: 'PLANTS PER DAY (USD)',
                        data: dGPlantsPerDayUSDPrice,
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
            options: chartOptions
        })
    })   

    //--- Drip Garden Action -----------------------------------------------------------------------------------                 

    $.get('/dGActionDBAPI', function(arg) {
        let dGDBUpdateDate = []
        let dGPlantsPerDayUSDPrice = []
        let dGPlantsPerDayUSDPriceHarvest = []
        let dGPlantsTotalUSDPrice = []
        let dGPlantsTotalUSDPriceHarvest = []
    
        for (let i = 0; i < Object.keys(arg).length; i++) {    
            dGDBUpdateDate[i] = arg[i].dGDBUpdateDate
            console.log(arg[i].dGDAction)
            if (arg[i].dGDAction == 'Claim') {
                dGPlantsPerDayUSDPrice[i] = arg[i].dGPlantsPerDayUSDPrice
                dGPlantsTotalUSDPrice[i] = arg[i].dGPlantsTotalUSDPrice
            } else {
                dGPlantsPerDayUSDPriceHarvest[i] = arg[i].dGPlantsPerDayUSDPrice
                dGPlantsTotalUSDPriceHarvest[i] = arg[i].dGPlantsTotalUSDPrice
            }
        }
    
        const ctx = document.getElementById('chart4');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dGDBUpdateDate ,
                datasets: [
                    {
                        label: 'PLANTS PER DAY - CLAIMS (USD)',
                        data: dGPlantsPerDayUSDPrice,
                        backgroundColor: [
                            'rgba(255, 205, 86, 1)'
                
                        ],
                        borderColor: [
                            'rgba(255, 205, 86, 1)'
                        ],
                        borderWidth: 2
                    },
                    {
                        label: 'PLANTS PER DAY - HARVEST (USD)',
                        data: dGPlantsPerDayUSDPriceHarvest,
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
            options: chartOptions
        })
    })
    

//--- Drip Garden Info Line Chart -----------------------------------------------------------------------------------                     
    $.get('/dGInfoDBAPI', function(arg) {
        let dGDBUpdateDate = []
        let dGtotalNumberofPlants = []
        let dGPricePerPlant = []
        let dGPricePerPlantUSD = []
        let dGDripBusdLPPriceUSD = []

        for (let i = 0; i < Object.keys(arg).length; i++) {    
            dGDBUpdateDate[i] = arg[i].dGDBUpdateDate
            dGtotalNumberofPlants[i] = arg[i].dGtotalNumberofPlants
            dGPricePerPlant[i] = arg[i].dGPricePerPlant
            dGPricePerPlantUSD[i] = arg[i].dGPricePerPlantUSD
            dGDripBusdLPPriceUSD[i] = arg[i].dGDripBusdLPPriceUSD
        }

        const ctx = document.getElementById('chart3');
        const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dGDBUpdateDate ,
            datasets: [
                {
                    label: 'PRICE PER PLANT (LP)',
                    data: dGPricePerPlant,
                    backgroundColor: [
                        'rgba(255, 205, 86, 1)'
            
                    ],
                    borderColor: [
                        'rgba(255, 205, 86, 1)'
                    ],
                    borderWidth: 2
                },
                {
                    label: 'PRICE PER PLANT (USD)',
                    data: dGPricePerPlantUSD,
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
        options: chartOptions
        })
    })

    

