const cron = require('node-cron');
const { fetchAndParseWeatherForecast, getCurrentDayWeather, getThreeDayForecast } = require('./forecast');
const { currentTimeStamp } = require('./helper');

function runCron() {
    console.log('-----------------------------------------------------------------------------------------------------')
    console.log('| > Cron Started');

    // Schedule a task to run every minute
    //cron.schedule('0 */4 * * *', async function() { // Runs every 4 hours starting from 00:00
    cron.schedule('* * * * *', async function() { // Runs every 4 hours starting from 00:00
        try {
            console.log('-----------------------------------------------------------------------------------------------------')
            console.log('| ' + currentTimeStamp() + ' | > FireBase Update | Weather Forecast');
            
            const forecastData = await fetchAndParseWeatherForecast();
            getCurrentDayWeather(forecastData);
            getThreeDayForecast(forecastData);
        
        } catch(e) {
            console.log('Firebase Update Error ' + e)
        }
    });
}


module.exports = {  runCron : runCron}