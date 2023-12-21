getIndoorData();
getOutdoorData();

window.onload = function() {
    setInterval(() => {getIndoorData();
                       getOutdoorData();}, 10000); // Update every 10 seconds
    createChart();
    
    setInterval(() => {updateChartData();
                    }, 14400000); // 14400000 milliseconds = 1 hour
};
 
function getIndoorData() {
    fetch('/getIndoorData').then(response => response.json()).then(data => {
        updateIndoorMinMaxValues(data.indoor_temp, data.indoor_hum);
        displayIndoorData(data.indoor_temp, data.indoor_hum);
    }).catch(error => {
       console.error('Error fetching indoor data:', error);
       document.getElementById('indoorData').innerHTML = '<h3>Failed to load data.</h3>';
    });
}

function getOutdoorData() {
    fetch('/getOutdoorData').then(response => response.json()).then(data => {
        updateOutdoorMinMaxValues(data.outdoor_temp, data.outdoor_hum);
        displayOutdoorData(data.outdoor_temp, data.outdoor_hum);
    }).catch(error => {
        console.error('Error fetching outdoor data:', error);
        document.getElementById('outdoorData').innerHTML = '<h3>Failed to load data.</h3>';
    });
}

function displayOutdoorData(temperature, humidity) {
    var sensorDisplay = '<h1>Għargħur Outdoor<h1>'
                      + '<h3>Temperature: ' + temperature + '°C</h3>'
                      + '<h5>Min: ' + localStorage.getItem('minTemp2') + '°C | Max: ' + localStorage.getItem('maxTemp2') + '°C</h5>'
                      + '<h3>Humidity: ' + humidity + '%</h3>'
                      + '<h5>Min: ' + localStorage.getItem('minHum2') + '% | Max: ' + localStorage.getItem('maxHum2') + '%</h5>';
    document.getElementById('outdoorData').innerHTML = sensorDisplay;
}

function displayIndoorData(temperature, humidity) {
    var sensorDisplay2 = '<h1>Indoor<h1>'
                      + '<h3>Temperature: ' + temperature + '°C</h3>'
                      + '<h5>Min: ' + localStorage.getItem('minTemp') + '°C | Max: ' + localStorage.getItem('maxTemp') + '°C</h5>'
                      + '<h3>Humidity: ' + humidity + '%</h3>'
                      + '<h5>Min: ' + localStorage.getItem('minHum') + '% | Max: ' + localStorage.getItem('maxHum') + '%</h5>';
    document.getElementById('indoorData').innerHTML = sensorDisplay2;
}

function updateIndoorMinMaxValues(temp, hum) {
    var maxTemp = parseFloat(localStorage.getItem('maxTemp')) || -Infinity;
    var minTemp = parseFloat(localStorage.getItem('minTemp')) || Infinity;
    var maxHum = parseFloat(localStorage.getItem('maxHum')) || -Infinity;
    var minHum = parseFloat(localStorage.getItem('minHum')) || Infinity;

    localStorage.setItem('maxTemp', Math.max(maxTemp, temp));
    localStorage.setItem('minTemp', Math.min(minTemp, temp));
    localStorage.setItem('maxHum', Math.max(maxHum, hum));
    localStorage.setItem('minHum', Math.min(minHum, hum));
}

function updateOutdoorMinMaxValues(temp, hum) {
    var maxTemp2 = parseFloat(localStorage.getItem('maxTemp2')) || -Infinity;
    var minTemp2 = parseFloat(localStorage.getItem('minTemp2')) || Infinity;
    var maxHum2 = parseFloat(localStorage.getItem('maxHum2')) || -Infinity;
    var minHum2 = parseFloat(localStorage.getItem('minHum2')) || Infinity;

    localStorage.setItem('maxTemp2', Math.max(maxTemp2, temp));
    localStorage.setItem('minTemp2', Math.min(minTemp2, temp));
    localStorage.setItem('maxHum2', Math.max(maxHum2, hum));
    localStorage.setItem('minHum2', Math.min(minHum2, hum));
}

function resetIndoorValues() {
    localStorage.removeItem('maxTemp');
    localStorage.removeItem('minTemp');
    localStorage.removeItem('maxHum');
    localStorage.removeItem('minHum');
    displayIndoorData('N/A', 'N/A'); // Update display after reset
}

function resetOutdoorValues() {
    localStorage.removeItem('maxTemp2');
    localStorage.removeItem('minTemp2');
    localStorage.removeItem('maxHum2');
    localStorage.removeItem('minHum2');
    displayOutdoorData('N/A', 'N/A'); // Update display after reset
}


