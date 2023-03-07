const apiKey = '44dda8f699c5f405c52085f983a2038d'; // Replace with your own API key
const city = 'London'; // Replace with the city name you want to search for

// Build the API endpoint URL
const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

// Make a fetch request to the API endpoint
fetch(geoUrl)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Unable to retrieve location data');
    }
  })
  .then(data => {
    // Log the latitude and longitude coordinates of the first result
    console.log(`Latitude: ${data[0].lat}, Longitude: ${data[0].lon}`);
  })
  .catch(error => {
    console.error(error);
  });