import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RestaurantDetails.scss";
import { fetchRestaurantDetails } from "../../utils/googlePlacesService";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function RestaurantDetails() {
    // Access the google_places_id parameter from the URL
    const { placeId } = useParams();

    // return(
    //     <div className="restaurant">
    //         <h2>Restaurant Details </h2>
    //     </div>
    // );

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

    // Render the restaurant details when they are available
    return (
        <div className="restaurant-details">
            <IconButton
                aria-label="close"
                // onClick={closeModal}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <h2>{restaurantDetails.name}</h2>
            <p>Rating: {restaurantDetails.rating}</p>
            <p>Address: {restaurantDetails.address}</p>
            <p>Phone: {restaurantDetails.phone}</p>
            <p>Website: {restaurantDetails.website}</p>
            <p>Hours: {restaurantDetails.hours}</p>

            <h3>Reviews:</h3>
            <ul>
                {restaurantDetails.reviews.map((review, index) => (
                    <li key={index}>
                        <p>Author: {review.author_name}</p>
                        <p>Rating: {review.rating}</p>
                        <p>Text: {review.text}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RestaurantDetails;