// today variables
var todayName = document.getElementById("today-date-day-name");
var todayNumber = document.getElementById("today-date-day-num");
var todayMonth = document.getElementById("today-date-month");
var todayLocation = document.getElementById("today-location");
var todayTemp = document.getElementById("today-temp");
var todayConditionImg = document.getElementById("today-condition-img");
var todayConditionText = document.getElementById("today-condition-text");
var humidity = document.getElementById("humidity");
var wind = document.getElementById("wind");
var windDirection = document.getElementById("wind-direction");

var weatherData;

// next Data
var nextDay = document.getElementsByClassName("next-day-name");
var nextMaxTemp = document.getElementsByClassName("next-max-temp");
var nextMinTemp = document.getElementsByClassName("next-min-temp");
var nextConditionImg = document.getElementsByClassName("next-condition-img");
var nextConditionText = document.getElementsByClassName("next-condition-text");

// search input
var searchInput = document.getElementById("search");

// Function to get weather data from the API
async function getWeatherData(cityName) {
  var weatherResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=4a0fa8989b6c4a3a890144654250209&q=${cityName}&days=3`
  );
  var weatherData = await weatherResponse.json();
  return weatherData;
}

// Main function to start the app
async function startApp(city = "cairo") {
  weatherData = await getWeatherData(city);
  if ( !weatherData.error) {
    displayTodayData(weatherData);
    displayNextData(weatherData);
  } else {
    
    console.error("Error massage");
  }
}

// Call the main function to start the app
startApp();

// Event listener for the search input
searchInput.addEventListener("keyup", function (e) {
  startApp(e.target.value);
});

// Function to display today's weather data
function displayTodayData(data) {
  var todayDate = new Date();
  todayName.innerHTML = todayDate.toLocaleDateString("en-Us", {
    weekday: "long",
  });
  todayMonth.innerHTML = todayDate.toLocaleDateString("en-Us", {
    month: "long",
  });
  todayNumber.innerHTML = todayDate.getDate();
  todayLocation.innerHTML = data.location.name;
  todayTemp.innerHTML = data.current.temp_c;
  todayConditionImg.setAttribute("src", "https:" + data.current.condition.icon);
  todayConditionText.innerHTML = data.current.condition.text;
  humidity.innerHTML = data.current.humidity + " %";
  wind.innerHTML = data.current.wind_kph + " km/h";
  windDirection.innerHTML = data.current.wind_dir;
}

// Function to display the next two days' weather data
function displayNextData(data) {
  var forecastData = data.forecast.forecastday;
  for (var i = 0; i < 2; i++) {
    var nextDate = new Date(forecastData[i + 1].date);
    nextDay[i].innerHTML = nextDate.toLocaleDateString("en-Us", {
      weekday: "long",
    });
    nextMaxTemp[i].innerHTML = forecastData[i + 1].day.maxtemp_c;
    nextMinTemp[i].innerHTML = forecastData[i + 1].day.mintemp_c;
    nextConditionImg[i].setAttribute(
      "src",
      "https:" + forecastData[i + 1].day.condition.icon
    );
    nextConditionText[i].innerHTML = forecastData[i + 1].day.condition.text;
  }


}
searchInput.addEventListener("input",function(){
    startApp(searchInput.value)
})