import "./CheckedRestaurant.scss";

function CheckedRestaurant({ itemName }) {
    return(
        <div className="checked-restaurant">
            <p>Would you like to rate {itemName}?</p>
            <p>Would you like to add {itemName} to your favorites?</p>
        </div>
    );
}

export default CheckedRestaurant;