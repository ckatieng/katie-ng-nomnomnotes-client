import './SearchRestaurant.scss';
import Slide from '@mui/material/Slide';

function SearchRestaurant ({ showSearchRestaurant, handleCancelAddRestaurantClick }) {

    return (
        <Slide direction="up" in={showSearchRestaurant} mountOnEnter unmountOnExit>
            <div className="search-restaurant">
                <div>
                    <h2 className="search-restaurant__title">Search Restaurant</h2>
                    <button className="search-restaurant__close" onClick={handleCancelAddRestaurantClick}>
                        Close
                    </button>
                </div>
            </div>
        </Slide>
    );
}

export default SearchRestaurant;