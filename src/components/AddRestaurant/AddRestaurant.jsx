import axios from "axios";
import { useEffect, useState, useRef, useMemo } from "react";
import { fetchGoogleApiKey } from "../../utils/googlePlacesService";
import "./AddRestaurant.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";
import Button from '../Button/Button';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import config from'../../utils/config';
import { useDarkMode } from "../DarkModeProvider/DarkModeProvider";

/* 
 * AddRestaurant Component
 * - Represents a component for adding a restaurant to the must-try list
 * - Uses Google Maps Places Autocomplete to search for restaurants based on user input
 * - Communicates with backend API to add selected restaurants to the must-try list
 *
 * Props:
 * 'updateMustTryList' prop: a function to update the list of must-try restaurants
 * 'handleCancelAddRestaurantClick' prop: a function to handle canceling the restaurant addition
 */

// Load Google Maps script
function loadScript(src, position, id, callback) {
    if (!position) {
        return;
    }

    const script = document.createElement("script");
    script.setAttribute("async", "");
    script.setAttribute("id", id);
    script.src = src;

    // Attach the callback function to the script element
    script.onload = callback;
    
    position.appendChild(script);
}

// Reference to the autocomplete service
const autocompleteService = { current: null };

function AddRestaurant({ updateMustTryList, handleCancelAddRestaurantClick }) {
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState([]);
    const [locationData, setLocationData] = useState(null);
    const loaded = useRef(false);
    const { isDarkMode } = useDarkMode();

    // State to control Snackbar open state and message
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');


    // Fetch the API key when the component mounts
    useEffect(() => {
        fetchGoogleApiKey()
        .then((apiKey) => {
            // Load the Google Maps script once the API key is available
            if (typeof window !== "undefined" && !loaded.current) {
                if (!document.querySelector("#google-maps")) {
                    loadScript(
                        `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`,
                        document.querySelector("head"),
                        "google-maps"
                    );
                }

                loaded.current = true;
            }
        })
        .catch((err) => {
            console.error(`Error fetching Google API Key: ${err}`);
        });
    }, []);

    // Fetch the user's location details
    useEffect(() => {
         // Location Url
        const locationUrl = `${config.serverUrl}/api/users/location`;

        axios.get(locationUrl)
            .then((response) => {
                const { formattedAddress, latitude, longitude, country, province } = response.data;
                setLocationData({ formattedAddress, latitude, longitude, country, province });
            })
            .catch((err) => {
                console.error(`Error fetching location details: ${err}`);
            });
    }, []);

    // Debounced function to fetch autocomplete suggestions
    const fetch = useMemo(() =>
        debounce((request, callback) => {
            // Restrict the search to restaurants
            request.types = ['restaurant', 'cafe', 'bakery'];

            // If the user's location is available, include it in the request
            if (locationData) {
                request.location = new window.google.maps.LatLng(
                    locationData.latitude, 
                    locationData.longitude
                );

                // Set the country restriction
                request.componentRestrictions = {
                    country: locationData.country,
                };

                // Radius in meters
                request.radius = 20000;
            }
            autocompleteService.current.getPlacePredictions(request, callback);
        }, 400),
    [locationData]);

    useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.google) {
            autocompleteService.current =
            new window.google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }
        if (inputValue === "") {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue }, (results) => {
            if (active) {
                let newOptions = [];

                if (value) {
                newOptions = [value];
                }

                if (results) {
                newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
        active = false;
        };
    }, [value, inputValue, fetch]);

    // Function to handle adding a restaurant
    const handleAddRestaurant = () => {
        console.log(value);

        // Check if a restaurant is selected
        if (!value) {
            console.error("No restaurant selected.");
            return;
        }

        // Extract the google_places_id from the selected restaurant
        const google_places_id = value.place_id;

        // Must-try URL
        const mustTryUrl = `${config.serverUrl}/api/must-try`;

        // Send a POST request to add the restaurant to the must-try list
        axios.post(mustTryUrl, { google_places_id })
            .then((response) => {
                console.log("Restaurant added to must-try list:", response.data);

                // Update the must-try list state to include the newly added restaurant
                updateMustTryList();

                handleCancelAddRestaurantClick();
            })
            .catch((err) => {
                console.error(`Error adding must-try item: ${err}`);
                // Show an error message in the Snackbar
                setSnackbarMessage("It's already in your list!");
                setSnackbarOpen(true);
            });
       
    };

    return (
        <div className={`add-restaurant ${isDarkMode ? 'add-restaurant__dark-mode' : ''}`}>
            <Autocomplete
                className={`add-restaurant__autocomplete ${isDarkMode ? 'add-restaurant__autocomplete-dark-mode' : ''}`}
                id="google-map"
                sx={{ 
                    width: 300,
                }}
                getOptionLabel={(option) =>
                    typeof option === "string" ? option : option.structured_formatting.main_text
                }
                filterOptions={(x) => x}
                options={options}
                autoComplete
                includeInputInList
                filterSelectedOptions
                value={value}
                noOptionsText={
                    <Typography sx={{ 
                        color: isDarkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.3)',
                    }}>No restaurants
                    </Typography>
                }
                onChange={(event, newValue) => {
                    setOptions(newValue ? [newValue, ...options] : options);
                    setValue(newValue);
                }}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        label="Where to eat?" 
                        sx={{
                            width: 300,
                            // Input outline
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: isDarkMode ? "rgba(255,255,255,0.25)" : 'rgba(0,0,0,0.2)',
                            },
                            // Input hover outline
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: isDarkMode ? "#ffffff": "#8e7cd1",
                            },
                            // Focused hover outline
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#8e7cd1",
                                },
                            },
                            // Label color
                            "& .MuiInputLabel-root": {
                                color: "#8174c1", 
                            },
                            // Small label color
                            "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                                color: "#8174c1", 
                            },
                            // Input text color
                            '& .MuiInputBase-input': {
                                color: isDarkMode ? '#ffffff' : '#000000',
                            },
                            // Input default arrow
                            '& .MuiSvgIcon-root': {
                                color: isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
                            },
                        }}
                        fullWidth />
                )}
                renderOption={(props, option) => {
                    const matches =
                    option.structured_formatting.main_text_matched_substrings || [];

                    const parts = parse(
                        option.structured_formatting.main_text,
                        matches.map((match) => [match.offset, match.offset + match.length])
                    );

                    return (
                        <div key={option.description}
                            className={`add-restaurant__results ${isDarkMode ? 'add-restaurant__results-dark-mode' : ''}`}
                        >
                            <li {...props}>
                                <Grid container alignItems="center">
                                    <Grid item sx={{ display: "flex", width: 44}}>
                                        <LocationOnIcon sx={{ color: "text.secondary" }} />
                                    </Grid>
                                    <Grid
                                        item
                                        sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
                                    >
                                        {parts.map((part, index) => (
                                            <Box
                                                key={index}
                                                component="span"
                                                sx={{ 
                                                    fontWeight: part.highlight ? "bold" : "regular",
                                                    color: part.highlight ? (isDarkMode ? '#ffffff' : '#000000') : (isDarkMode ? '#ffffff' : 'rgba(0, 0, 0, 0.8)'),
                                                }}
                                            >
                                                {part.text}
                                            </Box>
                                        ))}
                                        <Typography variant="body2" color="text.secondary"
                                            sx={{
                                                color: isDarkMode ? '#aaaaaa' : 'rgba(0, 0, 0, 0.6)',
                                            }}
                                        >
                                            {option.structured_formatting.secondary_text}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </li>
                        </div>
                    );
                }}
            />
            <div className="add-restaurant__add">
                <Button variant="primary" text="Add Restaurant" onClick={handleAddRestaurant}/>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000} 
                onClose={() => setSnackbarOpen(false)}
                TransitionComponent={Slide}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                style={{ marginBottom: '60px' }}
            />
        </div>
    );
}

export default AddRestaurant;