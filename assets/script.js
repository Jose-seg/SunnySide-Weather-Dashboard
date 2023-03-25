
let weatherTable = document.querySelector('previous-results');

let searchbar = document.querySelector
('#search-bar');

let tableBody = document.querySelector('table-body');

let searchButon = document.querySelector('#search-button');

let cityName = document.querySelector('#search-bar').value;

function getLocation() {
    let cityName = searchbar.value;
    let locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=44dda8f699c5f405c52085f983a2038d`;

    fetch(locationUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(locData){
        console.log('locData', locData);

        if (locData.length > 0){
            let lat = locData[0].lat;
            let lon = locData[0].lon;
            let city = locData[0].name;

            let weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metrics&appid==44dda8f699c5f405c52085f983a2038d`;

            fetch(weatherUrl)
            .then(function(response){
                return response.json();
            })
            .then(function(weatherData){
                console.log('weatherData', weatherData);

            //This should display current weather data
                let today = weatherData.today;
                let temp = today.temp;
                let humidity = today.humidity;
                let wind = today.wind_speed;
                let icon = today.weather[0].icon;
                let description = today.weather[0].description;
                let dateTime = new Date(today.dt * 1000);

            //Here we create our elements so we can display the retrieved data
            let tableRow = document.createElement('tr');
            let tableData = document.createElement('td');
            let cityElement = document.createElement('h4');
            let tempElement = document.createElement('p');
            let humidtyElemnt = document.createElement('p');
            let windElemnt = document.createElement('p');
            let iconElement = document.createElement('img');
            let descriptionElement = document.createElement('p');
            let dateTimeElement = document.createElement('p');

            //Traverses through the data to retrieve necessary data
            cityElement.textContent = city;
            tempElement.textContent = `Temperature: ${temp}°C`;
            humidtyElemnt.textContent = `Humidity: ${humidity}%`;
            windElemnt.textContent = `Wind Speed: ${wind}m/s`;
            iconElement.src = `https://openweathermap.org/img/w/${icon}.png`;
            descriptionElement.textContent = `${description}`;
            dateTimeElement.textContent = `${dateTime.toLocaleString()}`;
            })
        }
    })
}

searchButon.addEventListener('click', getLocation);
