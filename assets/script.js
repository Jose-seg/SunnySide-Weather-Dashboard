
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
    //Clears search bar
    cityInput.value = '';
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
    <h3>${name} (${new Date().toLocaleDateString()}) <img src='${iconUrl}' alt='weather icon'></h3>
    <p>Temperature: ${main.temp}°C</p>
    <p>Humidity: ${main.humidity}%</p>
    <p>Wind Speed: ${wind.speed} m/s</p>`;

    addToSearchHistory(name);
}

// Display 5-day forecast
function displayForecast(data) {
    const {list} = data;
    const dailyData = [];

    for(let i = 0; i < list.length; i += 8) {
        dailyData.push(list[i]);
    }
    dailyData.shift(); //Takes away current day data

    forecastDiv.innerHTML = dailyData
    .map((dayData) => {
        const {dt, main, wind, weather} = dayData;
        const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
        const date = new Date(dt * 1000).toLocaleDateString();

        return `<div class="forecast-day">
                    <h4>${date} <img src="${iconUrl}" alt="weather icon"></h4>
                    <p>Temperature: ${main.temp}°C</p>
                    <p>Humidity: ${main.humidity}%</p>
                    <p>Wind Speed: ${wind.speed} m/s</p>`;
    })
    .join('');
}

// Add city to search history and create click event
function addToSearchHistory(city) {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (!searchHistory.includes(city)) {
        searchHistory.unshift(city);
    // Maximizes the number of items that are stored in search history to 5
        searchHistory.splice(5);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
    loadSearchHistory();
}

// Load search history from local storage
function loadSearchHistory() {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    searchHistoryList.innerHTML= '';

    searchHistory.forEach((city) => {
        const li = document.createElement('li');
        li.textContent = city;
        li.addEventListener('click', () => {
            fetchWeather(city);
        });
        searchHistoryList.appendChild(li);
    })
}

loadSearchHistory();