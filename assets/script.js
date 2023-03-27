
const API_KEY = '44dda8f699c5f405c52085f983a2038d';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeatherDiv = document.getElementById('current-weather');
const forecastDiv = document.getElementById('forecast');
const searchHistoryList = document.getElementById('search-history');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value;
    fetchWeather(city);
});

function fetchWeather(city) {
    // Fetch current weather
    const currentWeatherUrl = `${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`;
    fetch(currentWeatherUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log('current weather data', data);
            displayCurrentWeather(data);
        });
    
    // Fetch 5-day forecast
    const forecastUrl = `${BASE_URL}forecast?q=${city}&appid=${API_KEY}&units=metric`;
    fetch(forecastUrl)
        .then((response) => response.json())
    .then((data) => {
        console.log('forecast data', data);
        displayForecast(data);
    });
}

// Display current weather details
function displayCurrentWeather(data) {
    const {name, main, wind, weather} = data;
    const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;

    currentWeatherDiv.innerHTML = `
    <h3>${name} (${new Date()})`
}

function displayForecast(data) {
    // Display 5-day forecast
}

function addToSearchHistory(city) {
    // Add city to search history and create click event
}

function loadSearchHistory() {
    // Load search history from local storage
}

loadSearchHistory();