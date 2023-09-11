import axios from "axios";
import { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { fetchGoogleApiKey, fetchLocationDetails } from "../../utils/googlePlacesService";
import "./SelectLocation.scss";
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

/*
 * SelectLocation Component
 * - Allows users to select and set their location
 * - Fetches and displays location suggestions from Google Places API
 * - After location is succesfully set, it navigates back to home (MustTryPage)
 */

// Function to load the Google Maps script dynamically
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

// Reference for the Autocomplete service
const autocompleteService = { current: null };

export default function SelectLocation() {
    const [value, setValue] = useState(null); // Selected location
    const [inputValue, setInputValue] = useState(""); // Input value for location search
    const [options, setOptions] = useState([]); // Location suggestions

    // State to control Snackbar open state and message
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const loaded = useRef(false);
    const navigate = useNavigate();

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

    // Debounce the fetch function
    const fetch = useMemo(() =>
        debounce((request, callback) => {
            // Limit results to cities
            autocompleteService.current.getPlacePredictions({
                ...request,
                types: ["(cities)"]
            }, callback);
        }, 400),
    []);

    // Fetch location suggestions when the input value changes
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

    // Handle location submission
    const handleLocationSubmit = () => {
        console.log(value);
        // Fetch the Google API key
        fetchGoogleApiKey()
            .then((apiKey) => {
                if (value) {
                    const placeId = value.place_id;

                    // Fetch location details from the backend
                    fetchLocationDetails(placeId)
                        .then((data) => {
                            if (data) {
                                const { formattedAddress, latitude, longitude, country, province } = data;

                                // Send the updated location data to your backend
                                const locationData = {
                                    latitude,
                                    longitude,
                                    placeId,
                                    formattedAddress,
                                    country,
                                    province,
                                };

                                // Make a POST request to update the user's location
                                axios.post('http://localhost:5050/api/google-api/set-location', locationData)
                                    .then((response) => {
                                        console.log('Location updated successfully:', response.data);

                                        // Show a success message in the Snackbar
                                        setSnackbarMessage('Your new location is set!');
                                        setSnackbarOpen(true);

                                        // After the delay
                                        setTimeout(() => {
                                            // navigate to the home page
                                            navigate('/');
                                        }, 2300);
                                    })
                                    .catch((error) => {
                                        console.error('Error updating location:', error);
                                        // Show an error message in the Snackbar
                                        setSnackbarMessage("Error updating your location");
                                        setSnackbarOpen(true);
                                    });
                            } else {
                                console.error('Location details not found.');
                            }
                        })
                        .catch((error) => {
                            console.error('Error fetching location details:', error);
                        });
                } else {
                    console.log('No location selected.');
                    // Show an error message in the Snackbar
                    setSnackbarMessage("No location selected yet");
                    setSnackbarOpen(true);
                }
            })
            .catch((error) => {
                console.error('Error fetching Google API Key:', error);
            });
    };

    return (
        <div className="select-location">
            <Autocomplete
                id="google-map"
                sx={{ width: 300 }}
                getOptionLabel={(option) =>
                    typeof option === "string" ? option : option.description
                }
                filterOptions={(x) => x}
                options={options}
                autoComplete
                includeInputInList
                filterSelectedOptions
                value={value}
                noOptionsText="No locations"
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
                        label="Add a location" 
                        sx={{
                            width: 300,
                            // Input hover outline
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#8e7cd1",
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
                        <div key={option.description}>
                            <li {...props}>
                                <Grid container alignItems="center">
                                    <Grid item sx={{ display: "flex", width: 44 }}>
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
                                                sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                                            >
                                                {part.text}
                                            </Box>
                                        ))}
                                        <Typography variant="body2" color="text.secondary">
                                            {option.structured_formatting.secondary_text}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </li>
                        </div>
                    );
                }}
            />
            <div className="select-location__set">
                <Button variant="primary" text="Set Location" onClick={handleLocationSubmit}/>
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