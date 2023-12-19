var chart = null;

const maxDataPoints = 744; // 24 hours * 7 days

let chartData = {
    labels: [], // Time labels
    datasets: [{
        label: 'Temperature (°C)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointRadius: 0, // No node dots on the line
        data: [] // Temperature data
    },
    {
        label: 'Humidity (%)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        PointRadius: 0, // No node dots on the line
        data: [] // Humidity data
    }]
};

function saveChartData() {
    localStorage.setItem('chartData', JSON.stringify(chartData));
}

function loadChartData() {
    const savedData = localStorage.getItem('chartData');
    if (savedData) {
        chartData = JSON.parse(savedData);
    }
}

function updateChartData() {
    fetch('http://192.168.1.158/data').then(response => response.json()).then(data => {
        addChartData(data.temperature, data.humidity);
    }).catch(error => {
        console.error('Error fetching chart data:', error);
        document.getElementById('sensorChart').innerHTML = '<h3>Failed to load chart data.</h3>';
    });
}

function createChart() {
    loadChartData(); // Load chart data from localStorage
    const ctx = document.getElementById('sensorChart').getContext('2d');
    chart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Value'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time'
                        }
                    }
                }
            }
        });
    }


function addChartData(temperature, humidity) {
    console.log(chartData);
    const currentDate = new Date().toISOString(); // Current date and time in ISO string format
    const displayLabel = formatDateForDisplay(currentDate); // Format for display
    
        if (chartData.labels.length >= maxDataPoints) {
            chartData.labels.shift();
            chartData.datasets[0].data.shift(); // Temperature data
            chartData.datasets[1].data.shift(); // Humidity data
        }
        
        console.log(displayLabel);
        chartData.labels.push(displayLabel); // Use formatted label for display
        chartData.datasets[0].data.push({ x: displayLabel, y: temperature }); // Store original date for filtering
        chartData.datasets[1].data.push({ x: displayLabel, y: humidity }); // Store original date for filtering
        saveChartData();
        chart.update();
    }

function formatDateForDisplay(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}-${month} ${hours}:${minutes}`;
}