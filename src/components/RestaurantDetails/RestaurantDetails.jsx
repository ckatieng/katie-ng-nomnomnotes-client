
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RestaurantDetails.scss";
import { fetchRestaurantDetails } from "../../utils/googlePlacesService";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

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
        // Render a loading message or spinner while fetching data
        return <div>Loading...</div>;
    }

    // Must-Try API URL
    const mustTryURL = "http://localhost:5050/api/must-try";

    // Function to handle when the add button is clicked
    const addItemHandler = (placeId) => {
        
        console.log(placeId);

        // Send a POST request to add the restaurant to the must-try list
        axios.post(mustTryURL, {google_places_id: placeId})
            .then((response) => {
                console.log("Restaurant added to must-try list:", response.data);

                // Close the restaurant details and redirect back to the previous page
                handleCloseClick();
            })
            .catch((err) => {
                console.error(`Error adding must-try item: ${err}`);
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

            {/* <h3>Reviews:</h3>
            <ul className="restaurant-details__info">
                {restaurantDetails.reviews.map((review, index) => (
                    <li key={index}>
                        <p>Author: {review.author_name}</p>
                        <p>Rating: {review.rating}</p>
                        <p>Text: {review.text}</p>
                    </li>
                ))}
            </ul> */}
            </div>
        </div>
    );
}

export default RestaurantDetails;