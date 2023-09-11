
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RestaurantDetails.scss";
import { fetchRestaurantDetails } from "../../utils/googlePlacesService";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

/*
 * RestaurantDetails Component
 * - Displays detailed information about a restaurant
 * - Allows users to add the restaurant to their must-try list
 */

function RestaurantDetails() {
    // Access the google_places_id parameter from the URL
    const { placeId } = useParams();

    const navigate = useNavigate();

    const handleCloseClick = useCallback(() => {
        // Use the navigate function to go back to the previous page
        navigate(-1);
    }, [navigate]);

    // State to store restaurant details
    const [restaurantDetails, setRestaurantDetails] = useState(null);

    // State to control Snackbar open state and message
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
  
    useEffect(() => {
        // Fetch restaurant details when the component mounts
        fetchRestaurantDetails(placeId)
        .then((details) => {
            // Store the details in the state
            setRestaurantDetails(details);
        })
        .catch((err) => {
            console.error(`Error fetching restaurant details: ${err}`);
        });
    }, [placeId]); // Fetch details when the placeId parameter changes

    if (!restaurantDetails) {
        // Render loading while fetching data
        return <LoadingSpinner />
    }

    // Must-Try API URL
    const mustTryURL = "http://localhost:5050/api/must-try";

    // Function to handle when the add button is clicked
    const addItemHandler = (placeId) => {
        // Send a POST request to add the restaurant to the must-try list
        axios.post(mustTryURL, {google_places_id: placeId})
            .then((response) => {
                console.log("Restaurant added to must-try list:", response.data);

                // Show a success message in the Snackbar
                setSnackbarMessage('Successfully added to your must-try list!');
                setSnackbarOpen(true);

                // Delay the navigation
                setTimeout(() => {
                    // Close the restaurant details and redirect back to the previous page
                    handleCloseClick();
                }, 2300);
            })
            .catch((err) => {
                console.error(`Error adding must-try item: ${err}`);

                // Show an error message in the Snackbar
                setSnackbarMessage("It's already in your list!");
                setSnackbarOpen(true);
            });
    }

    // Render the restaurant details when they are available
    return (
        <div className="restaurant-details">
            <div className="restaurant-details__container">
            <IconButton
                aria-label="close"
                onClick={handleCloseClick}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <div className="restaurant-details__restaurant">
                <h2 className="restaurant-details__name">{restaurantDetails.name}</h2>
                <div className="restaurant-details__add">
                    <IconButton disableTouchRipple className="restaurant-details__add-icon" size="medium" onClick={() => addItemHandler(placeId)} style={{ color:'#73649b' }}>
                        <AddIcon fontSize="inherit"/>
                    </IconButton>
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
            </div>
            <p className="restaurant-details__info"><strong>Rating: </strong>{restaurantDetails.rating}</p>
            <p className="restaurant-details__info"><strong>Address: </strong>{restaurantDetails.address}</p>
            <p className="restaurant-details__info"><strong>Phone: </strong>{restaurantDetails.phone}</p>
            <p className="restaurant-details__info"><strong>Website: </strong>{restaurantDetails.website}</p>
            <p className="restaurant-details__hours"><strong>Hours: </strong></p>
                <ul className="restaurant-details__list">
                    {restaurantDetails.hours.map((hour, index) => (
                        <li key={index} className="restaurant-details__hours">{hour}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default RestaurantDetails;