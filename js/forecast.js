const axios = require('axios');
const jsdom = require('jsdom');
const { writeFirebase, readFirebase } = require('./helper');
const { JSDOM } = jsdom;
const forecastData = [];

async function scrapeWeatherData(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const weatherData = [];

    $('.wgt-7-day-forecast-cont .day-forecast').each((i, element) => {
      const day = $(element).find('.day-name').text();
      const temp = $(element).find('.temp').text();
      const description = $(element).find('.weather-description').text();

      weatherData.push({ day, temp, description });
    });
    
    return weatherData;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function fetchAndParseWeatherForecast() {
   try {
       const response = await axios.get('https://www.maltairport.com/weather/7-day-forecast/');
       const dom = new JSDOM(response.data);
       const forecastElements = dom.window.document.querySelectorAll('#wgt-7-day-forecast-cont .carosel div');
       
       let forecastData = [];
       
       forecastElements.forEach(element => {
           const date = formatDate(element.querySelector('.date').textContent.trim());
           const condition = element.querySelector('h3').textContent.trim();
           const img = element.querySelector('img').src.trim(); 
           const feelsLike = element.querySelector('.feelslike').textContent.replace('Feels Like', '').trim();
           const temp = element.querySelector('.temp').textContent.trim();
           const wind = element.querySelector('.wind').textContent.trim();
           const uv = element.querySelector('.uv').textContent.replace('UV', '').trim();
           console.log('date ' + date);
           forecastData.push({ date, condition, img, feelsLike, temp, wind, uv });
       });

      const forecastDataObject = {
        "Week_Forecast": forecastData
      };

      //console.log(forecastDataObject);
      writeFirebase(forecastDataObject,"forecast/Week");

       return forecastData;
   } catch (error) {
       console.error('Error fetching or parsing data:', error);
   }
}

function formatDate(dateString) {
  // Split the dateString into parts
  let parts = dateString.split(' ');

  // Check if the day part (second element in the array) starts with a '0'
  if (parts[1].startsWith('0')) {
      // Remove the '0'
      parts[1] = parts[1].substring(1);
  }

  // Rejoin the parts and return
  return parts.join(' ');
}

function getCurrentDayWeather(weatherData) {
  if (weatherData) {
      const today = new Date();
      const todayString = today.toLocaleDateString('en-GB', {
          weekday: 'long', 
          day: 'numeric', 
          month: 'long'
      }).replace(/,/g, ''); // Remove commas
      
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      const tomorrowString = tomorrow.toLocaleDateString('en-GB', {
          weekday: 'long', 
          day: 'numeric', 
          month: 'long'
      }).replace(/,/g, ''); // Remove commas

      let output = weatherData.find(day => day.date === todayString) || weatherData.find(day => day.date === tomorrowString);
      
      if (output) {
          const currentForecastObject = {
              "Current_Forecast": {
              "condition": output.condition,
              "temp": output.temp,
              "feelsLike" : output.feelsLike,
              "wind": output.wind
              }
          };
          writeFirebase(currentForecastObject,"forecast/CurrentDay");

          return currentForecastObject.Current_Forecast;
      }
  }
}


function getThreeDayForecast(weatherData) {
  
  const firstThreeDays = weatherData.slice(1, 4);

  const threeDayForecastObject = {
    "3Day_Forecast": firstThreeDays || null
  };
  writeFirebase(threeDayForecastObject,"forecast/3Day");

  // Print or process the first three days
  // firstThreeDays.forEach(day => {
  //     console.log(day);
  // });

  return firstThreeDays || null;
}

function getWeekForecastData() {
  return readFirebase("forecast/Week/Week_Forecast");
}

function getTodayForecastData() {
  return readFirebase("forecast/Week/Current_Forecast");
}

function get3DayForecastData() {
  return readFirebase("forecast/Week/3Day_Forecast");
}

module.exports = {  fetchAndParseWeatherForecast : fetchAndParseWeatherForecast,
                  getCurrentDayWeather : getCurrentDayWeather,
                  getThreeDayForecast : getThreeDayForecast,
                  scrapeWeatherData : scrapeWeatherData,
                  getWeekForecastData : getWeekForecastData,
                  getTodayForecastData : getTodayForecastData,
                  get3DayForecastData : get3DayForecastData,
                  forecastData : forecastData
                }