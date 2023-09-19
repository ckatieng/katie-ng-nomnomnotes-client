import axios from "axios";
import { useState } from "react";
import "./CheckedRestaurant.scss";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import HoverRating from "../HoverRating/HoverRating";
import Button from '../Button/Button';

/*
 * CheckedRestaurant Component
 * - Allows users to rate and move a restaurant to their favorites or visited list
 *
 * Props:
 * 'itemId' prop: unique identifier for the checked restaurant
 * 'itemName' prop: name of the checked restaurant
 * 'googlePlacesId' prop: unique identifier for the restaurant on Google Places
 * 'closeModal' prop: a function to close the modal
 * 'updateMustTryList' prop: a function to update the list of must-try restaurants
 */

function CheckedRestaurant({ itemId, itemName, googlePlacesId, closeModal, updateMustTryList, mode }) {
    // States
    const [selectedOption, setSelectedOption] = useState("No");
    const [rating, setRating] = useState(0);

     // Function to move the restaurant to favorites
    const handleMoveToFavourites = () => {
        const ratingData = {
            // Only send the rating if it's greater than 0
            rating: rating > 0 ? rating : null,
        };

        // Make a PUT request to move the item to favourites
        axios.put(`http://localhost:5050/api/must-try/${itemId}/move-to-favourites`, 
            // Send the rating to the server 
            ratingData)
            .then((response) => {
                closeModal();
                updateMustTryList();
            })
            .catch((err) => {
                console.error(`Error moving item to favourites: ${err}`);
            });
    }

    // Function to move the restaurant to visited
    const handleMoveToVisited = () => {
        const ratingData = {
            // Only send the rating if it's greater than 0
            rating: rating > 0 ? rating : null,
        };

        // Make a PUT request to move the item to visited
        axios.put(`http://localhost:5050/api/must-try/${itemId}/move-to-visited`, ratingData)
            .then((response) => {
                closeModal();
                updateMustTryList();
            })
            .catch((err) => {
                console.error(`Error moving item to visited: ${err}`);
            });
    }

    // Function to handle user rating
    const handleRating = (newValue) => {
        // Only send the rating if it's greater than 0
        const ratingToSend = newValue > 0 ? newValue : null;

        // Make a POST request to add rating to table
        axios.post("http://localhost:5050/api/ratings", { 
            googlePlacesId: googlePlacesId,
            rating: ratingToSend,
        })
            .then((response) => {
                setRating(ratingToSend);
            })
            .catch((err) => {
                console.error(`Error sending rating data: ${err}`);
            });
    }

    // Function to handle radio button selection (yes or no)
    const handleOptionSelect = (event) => {
        setSelectedOption(event.target.value);
    };

    // Function to handle form submission
    const handleSubmit = () => {
        if (selectedOption === 'Yes') {
            handleMoveToFavourites();
        } else if (selectedOption === 'No') {
            handleMoveToVisited();
        }
        handleRating(rating);
    }

    return(
        <div className="checked-restaurant">
            <div className={`checked-restaurant__container ${mode === 'dark' ? 'checked-restaurant__dark-mode' : ''}`}>
                <IconButton
                    aria-label="close"
                    onClick={closeModal}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <div className="checked-restaurant__rating">
                    <p className="checked-restaurant__paragraph">How was {itemName}? (Optional)</p>
                    <HoverRating handleRatingChange={setRating} />
                </div>
                <div className="checked-restaurant__results">
                    <p className="checked-restaurant__paragraph">Would you like to add {itemName} to your favorites?</p>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="No"
                                checked={selectedOption === "No"}
                                onChange={handleOptionSelect}
                            />
                            No
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Yes"
                                checked={selectedOption === "Yes"}
                                onChange={handleOptionSelect}
                            />
                            Yes
                        </label>
                    </div>
                </div>
                <div className="checked-restaurant__done">
                    <Button variant="primary" text="Submit" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
}
export default CheckedRestaurant;