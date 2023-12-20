// -------------------------------------
// nodemon start.js --ignore config/
// forever start.js

// netstat
// netstat -ano | findstr :3000. 
// taskkill /pid 5636 /f
//
// -------------------------------------


var express = require('express');
var http = require('http');
const fs = require('fs');
var path = require('path');
var app = express();

var server = http.createServer(app);
var timeStamp = Math.floor(Date.now() / 1000);

const {  promiseToString, writeFirebase, getIndoorData, getOutdoorData } = require('./js/helper');
const { fetchAndParseWeatherForecast, getCurrentDayWeather, getThreeDayForecast, getTodayForecastData, get3DayForecastData, getWeekForecastData } = require('./js/forecast');
const { runCron } = require('./js/cron');

// --- START CRON   -------------------------------------------
runCron () ;

// --- START SERVER -------------------------------------------


app.use(express.static(path.join(__dirname + '/public'))); 

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(3000, function(err){
  if(err){
    console.log('Error starting http server');
  } else {
    var date_time = new Date();
    console.log("| > " + date_time);
    console.log("| > Server running at http://localhost:3000/");
    console.log('--------------------------------------------------')
  };
});

//-----------------------------------------------------------------------------

app.get('/weekforecastAPI/', function(req, res){
    promiseToString(fetchAndParseWeatherForecast()).then(
      function(value) {
        //console.log(value)
        res.send(value)
      })
}); 


app.get('/todaysWeather/', function(req, res){
  promiseToString(fetchAndParseWeatherForecast()).then(
    function(value) {
        //console.log(value)
        const todaysWeather = getCurrentDayWeather(value);
        //console.log('Today\'s Weather:', todaysWeather); // Log details of today's weather
        res.send(todaysWeather);
    })
}); 

app.get('/threeDayWeather/', function(req, res){
  promiseToString(fetchAndParseWeatherForecast()).then(
    function(value) {
        const todaysWeather = getThreeDayForecast(value);
        //console.log('3 days Weather:', todaysWeather); // Log details of today's weather
        res.send(todaysWeather);
    })
}); 

app.get('/writeFirebase/', function(req, res){
  res.send(writeFirebase())
}); 


// ------------ Get Data from Firebase --------------------------

app.get('/getIndoorData/', function(req, res){
  promiseToString(getIndoorData()).then(
    function(value) {
        //console.log("read Indoor Data from firebase - ");
        //console.log(value);
        res.send(value);
      })
}); 

app.get('/getOutdoorData/', function(req, res){
  promiseToString(getOutdoorData()).then(
    function(value) {
        //console.log("read Outdoor data from firebase - ");
        //console.log(value);
        res.send(value);
      })
}); 

app.get('/getWeekForecast/', function(req, res){ 
  promiseToString(getWeekForecastData()).then(  
    function(value) {
        //console.log("read Outdoor data from firebase - ");
        //console.log(value);
        res.send(value);
      })
}); 

app.get('/getTodayForecast/', function(req, res){
  promiseToString(getTodayForecastData()).then(
    function(value) {
        //console.log("read Outdoor data from firebase - ");
        //console.log(value);
        res.send(value);
      })
}); 

app.get('/get3DayForecast/', function(req, res){
  promiseToString(get3DayForecastData()).then(
    function(value) {
        //console.log("read Outdoor data from firebase - ");
        //console.log(value);
        res.send(value);
      })
}); 



