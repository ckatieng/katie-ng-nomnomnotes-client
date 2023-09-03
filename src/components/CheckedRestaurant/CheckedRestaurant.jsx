import axios from "axios";
import { useState } from "react";
import "./CheckedRestaurant.scss";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function CheckedRestaurant({ itemId, itemName, closeModal, updateMustTryList }) {
    // States
    const [isMovedToFavourites, setIsMovedToFavourites] = useState(false);
    const [isMovedToVisited, setIsMovedToVisited] = useState(false);

    const handleMoveToFavourites = () => {
        // Make a PUT request to move the item to favourites
        axios.put(`http://localhost:5050/must-try/${itemId}/move-to-favourites`)
            .then((response) => {
                setIsMovedToFavourites(true);
                closeModal();
                updateMustTryList();
            })
            .catch((error) => {
                console.error("Error moving item to favourites:", error);
            });
    }

    const handleMoveToVisited = () => {
        // Make a PUT request to move the item to visited
        axios.put(`http://localhost:5050/must-try/${itemId}/move-to-visited`)
            .then((response) => {
                setIsMovedToVisited(true);
                closeModal();
                updateMustTryList();
            })
            .catch((error) => {
                console.error("Error moving item to visited:", error);
            });
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
                <p>Would you like to rate {itemName}?</p>
                <p>Would you like to add {itemName} to your favorites?</p>
                <button type="button" onClick={handleMoveToVisited}>No</button>
                <button type="button" onClick={handleMoveToFavourites}>Yes</button>
            </div>
        </div>
    );
}
export default CheckedRestaurant;