import axios from "axios";

// Fetch Google API Key from the backend
export function fetchGoogleApiKey() {
    // API Key URL
    const apiKeyURL = "http://localhost:5050/api/google-api-key";

    return axios.get(apiKeyURL)
        .then((response) => {
            return response.data.apiKey;
        })
        .catch((err) => {
            console.error(`Error fetching Google API Key: ${err}`);
        });
}

// Fetch Restaurant Name from the backend
export function fetchRestaurantName(googlePlacesId) {
    return axios.get(`http://localhost:5050/api/restaurant/${googlePlacesId}`)
        .then((response) => {
            return response.data.name;
        })
        .catch((err) => {
            console.error(`Error fetching restaurant name: ${err}`);
        });
}