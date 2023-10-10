import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CustomCheckbox.scss";
import CheckedRestaurant from "../CheckedRestaurant/CheckedRestaurant";

/*
 * CustomCheckbox Component
 * - Represents a checkbox item with an associated restaurant name
 *
 * Props:
 * 'itemId' prop: unique identifier for the restaurant
 * 'itemName' prop: name of the restaurant
 * 'googlePlacesId' prop: unique identifier for the restaurant on Google Places
 * 'updateMustTryList' prop: a function to update the list of must-try restaurants
 */

function CustomCheckbox({ itemId, itemName, googlePlacesId, updateMustTryList, mode}) {
    // States
    const [isChecked, setIsChecked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Effect to handle modal opening when the checkbox state changes
    useEffect(() => {
        let timer;
        if (isChecked) {
            timer = setTimeout(() => {
                setIsModalOpen(true);
            }, 500);
        }

        return () => {
            // Clear the timer if the checkbox is unchecked before the delay completes
            clearTimeout(timer);
        };
    }, [isChecked]);

    // Function to handle checkbox click
    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
    };
    
    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setIsChecked(false);
    }

    return(
        <div className="custom-checkbox">
            <label className="custom-checkbox__label">
                <input
                    className={`custom-checkbox__checkbox ${mode === 'dark' ? 'custom-checkbox__checkbox-dark-mode' : ''}`}
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxClick}
                    aria-label={itemName} // Accessibility: Add an aria-label
                />
                <Link 
                    to={`/restaurant/${googlePlacesId}`} 
                    className={`custom-checkbox__item-name ${mode === 'dark' ? 'custom-checkbox__item-name-dark-mode' : ''}`}
                >
                    {itemName}
                </Link>  
            </label>
            
            {/* Checked Restaurant Modal */}
            {isModalOpen && (
                <CheckedRestaurant 
                    itemId={itemId} 
                    itemName={itemName} 
                    googlePlacesId={googlePlacesId}
                    closeModal={closeModal}
                    updateMustTryList={updateMustTryList}
                    mode={mode}
                />
            )}
        </div>
    );
}

export default CustomCheckbox;