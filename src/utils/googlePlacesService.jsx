import axios from 'axios';
import config from './config';

// Fetch Google API Key from the backend
export function fetchGoogleApiKey() {
    // API Key URL
    const apiKeyUrl = `${config.serverUrl}/api/google-api`;

    return axios.get(apiKeyUrl)
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
    return axios.get(`${config.serverUrl}/api/restaurant/${placeId}`)
        .then((response) => {
            return response.data.name;
        })
        .catch((err) => {
            console.error(`Error fetching restaurant name: ${err}`);
            throw err;
        });
}

// Fetch Restaurant Details from the backend
export function fetchRestaurantDetails(placeId) {
    return axios.get(`${config.serverUrl}/api/restaurant/details/${placeId}`)
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
    const locationUrl = `${config.serverUrl}/api/users/location`;

    return axios.get(locationUrl)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            console.error(`Error fetching user's location: ${err}`);
        });
}

// Fetch Location Details from the backend
export function fetchLocationDetails(placeId) {
    return axios.get(`${config.serverUrl}/api/google-api/${placeId}`)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            console.error(`Error fetching location details: ${err}`);
        });
}