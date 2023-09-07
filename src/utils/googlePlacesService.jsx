import axios from "axios";

// Fetch Google API Key from the backend
export function fetchGoogleApiKey() {
    // API Key URL
    const apiKeyURL = "http://localhost:5050/api/google-api";

    return axios.get(apiKeyURL)
        .then((response) => {
            return response.data.apiKey;
        })
        .catch((err) => {
            console.error(`Error fetching Google API Key: ${err}`);
            throw err;
        });
}

// Fetch Restaurant Name from the backend
export function fetchRestaurantName(placeId) {
    return axios.get(`http://localhost:5050/api/restaurant/${placeId}`)
        .then((response) => {
            return response.data.name;
        })
        .catch((err) => {
            console.error(`Error fetching restaurant name: ${err}`);
        });
}

// Fetch Restaurant Details from the backend
export function fetchRestaurantDetails(placeId) {
    return axios.get(`http://localhost:5050/api/restaurant/details/${placeId}`)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            console.error(`Error fetching restaurant details: ${err}`);
        });
}

// Fetch Saved User Location Details
export function fetchUserLocation() {
    // Location URL
    const locationURL = "http://localhost:5050/api/users/location";

    return axios.get(locationURL)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            console.error(`Error fetching user's location: ${err}`);
        });
}

// Fetch Location Details from the backend
export function fetchLocationDetails(placeId) {
    return axios.get(`http://localhost:5050/api/google-api/${placeId}`)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            console.error(`Error fetching location details: ${err}`);
        });
}