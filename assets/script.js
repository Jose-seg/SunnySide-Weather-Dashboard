// Get a reference to the previous-results container
const previousResultsContainer = document.getElementById('previous-results');

// Create a new div element for the search result
const searchResultDiv = document.createElement('div');

// Set the content of the search result div
searchResultDiv.textContent = 'Your search result goes here';

// Append the search result div to the previous-results container
previousResultsContainer.appendChild(searchResultDiv);