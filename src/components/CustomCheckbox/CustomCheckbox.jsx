import { useState } from "react";
import "./CustomCheckbox.scss"
import CheckedRestaurant from "../CheckedRestaurant/CheckedRestaurant";

function CustomCheckbox({ itemId, itemName, googlePlacesId, updateMustTryList }) {
    // States
    const [isNotChecked, setIsNotChecked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCheckboxClick = () => {
        setIsNotChecked(!isNotChecked);

        // Open the modal when the checkbox is clicked
        if (!isNotChecked) {
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsNotChecked(false);
    }

    return(
        <div className="custom-checkbox">
            <label className="custom-checkbox__label">
                <input
                    type="checkbox"
                    checked={isNotChecked}
                    onChange={handleCheckboxClick}
                    aria-label={itemName} // Accessibility: Add an aria-label
                />
                {itemName}
            </label>

            {/* Checked Restaurant Modal */}
            {isModalOpen && (
                <CheckedRestaurant 
                    itemId={itemId} 
                    itemName={itemName} 
                    googlePlacesId={googlePlacesId}
                    closeModal={closeModal}
                    updateMustTryList={updateMustTryList}
                />
            )}
        </div>
    );
}

export default CustomCheckbox;