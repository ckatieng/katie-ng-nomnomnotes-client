import axios from "axios";
import { useState } from "react";
import "./CheckedRestaurant.scss";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import HoverRating from "../HoverRating/HoverRating";
import Button from '../Button/Button';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import config from '../../utils/config';

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
    const [selectedOption, setSelectedOption] = useState("");
    const [rating, setRating] = useState(0);

    // State to control Snackbar open state and message
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

     // Function to move the restaurant to favorites
    const handleMoveToFavourites = () => {
        const ratingData = {
            // Only send the rating if it's greater than 0
            rating: rating > 0 ? rating : null,
        };

        // Make a PUT request to move the item to favourites
        axios.put(`${config.serverUrl}/api/must-try/${itemId}/move-to-favourites`, 
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
        axios.put(`${config.serverUrl}/api/must-try/${itemId}/move-to-visited`, ratingData)
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
        axios.post(`${config.serverUrl}/api/ratings`, { 
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
        // Check if either 'Yes' or 'No' is selected
        if (selectedOption === 'Yes' || selectedOption === 'No') {
            // Perform the submission logic only if one is selected
            if (selectedOption === 'Yes') {
                handleMoveToFavourites();
            } else if (selectedOption === 'No') {
                handleMoveToVisited();
            }
            handleRating(rating);
        } else {
            console.error('Please select an option.');
            // Show an error message in the Snackbar
            setSnackbarMessage("Please select No or Yes.");
            setSnackbarOpen(true);
        }
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
                    <p className="checked-restaurant__paragraph">How was <span style={{ fontWeight: 'bold' }}>{itemName}</span>? (Optional)</p>
                    <HoverRating handleRatingChange={setRating} />
                </div>
                <div className="checked-restaurant__results">
                    <p className="checked-restaurant__paragraph">Would you like to add <span style={{ fontWeight: 'bold' }}>{itemName}</span> to your favourites?</p>
                    <div className="checked-restaurant__radio">
                        <div className="checked-restaurant__radio-button">
                            <input
                                className={`checked-restaurant__radio-input ${mode === 'dark' ? 'checked-restaurant__radio-input-dark-mode' : ''}`}
                                type="radio"
                                id="radio-no"
                                value="No"
                                checked={selectedOption === "No"}
                                onChange={handleOptionSelect}
                            />
                            <label className={`checked-restaurant__radio-label ${mode === 'dark' ? 'checked-restaurant__radio-label-dark-mode' : ''}`} htmlFor="radio-no">
                                No
                            </label>
                        </div>

                        <div className="checked-restaurant__radio-button">
                            <input
                                className={`checked-restaurant__radio-input ${mode === 'dark' ? 'checked-restaurant__radio-input-dark-mode' : ''}`}
                                type="radio"
                                id="radio-yes"
                                value="Yes"
                                checked={selectedOption === "Yes"}
                                onChange={handleOptionSelect}
                            />
                            <label className={`checked-restaurant__radio-label ${mode === 'dark' ? 'checked-restaurant__radio-label-dark-mode' : ''}`} htmlFor="radio-yes">
                                Yes
                            </label>
                        </div>
                    </div>
                </div>
                <div className="checked-restaurant__done">
                    <Button variant="primary" text="Submit" onClick={handleSubmit} />
                </div>
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
export default CheckedRestaurant;