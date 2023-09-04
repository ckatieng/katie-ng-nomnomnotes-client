import axios from "axios";
import { useState } from "react";
import "./CheckedRestaurant.scss";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import HoverRating from "../HoverRating/HoverRating";

function CheckedRestaurant({ itemId, itemName, closeModal, updateMustTryList }) {
    // States
    // const [isMovedToFavourites, setIsMovedToFavourites] = useState(false);
    // const [isMovedToVisited, setIsMovedToVisited] = useState(false);
    const [selectedOption, setSelectedOption] = useState("No");
    const [rating, setRating] = useState(0);

    const handleMoveToFavourites = () => {
        const ratingData = {
            // Only send the rating if it's greater than 0
            rating: rating > 0 ? rating : null,
        };

        // Make a PUT request to move the item to favourites
        axios.put(`http://localhost:5050/must-try/${itemId}/move-to-favourites`, 
            // Send the rating to the server 
            ratingData)
            .then((response) => {
                // setIsMovedToFavourites(true);
                closeModal();
                updateMustTryList();
            })
            .catch((error) => {
                console.error("Error moving item to favourites:", error);
            });
    }

    const handleMoveToVisited = () => {
        const ratingData = {
            // Only send the rating if it's greater than 0
            rating: rating > 0 ? rating : null,
        };

        // Make a PUT request to move the item to visited
        axios.put(`http://localhost:5050/must-try/${itemId}/move-to-visited`,
            // Send the rating to the server 
            ratingData)
            .then((response) => {
                // setIsMovedToVisited(true);
                closeModal();
                updateMustTryList();
            })
            .catch((error) => {
                console.error("Error moving item to visited:", error);
            });
    }

    const handleOptionSelect = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = () => {
        if (selectedOption === 'Yes') {
            handleMoveToFavourites();
        } else if (selectedOption === 'No') {
            handleMoveToVisited();
        }
    }

    return(
        <div className="checked-restaurant">
            <div className="checked-restaurant__container">
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
                    <p>How was {itemName}? (Optional)</p>
                    <HoverRating handleRatingChange={setRating} />
                </div>
                <div className="checked-restaurant__results">
                    <p>Would you like to add {itemName} to your favorites?</p>
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
                    <button type="button" onClick={handleSubmit}>Done</button>
                </div>
            </div>
        </div>
    );
}
export default CheckedRestaurant;