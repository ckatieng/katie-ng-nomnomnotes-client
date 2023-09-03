import { useState } from "react";
import "./CustomCheckbox.scss"
import CheckedRestaurant from "../CheckedRestaurant/CheckedRestaurant";

function CustomCheckbox({ itemName }) {
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
                <div className="custom-checkbox__modal">
                    <div className="custom-checkbox__modal-content">
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <div className="custom-checkbox__modal-body">
                            <CheckedRestaurant itemName={itemName} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomCheckbox;