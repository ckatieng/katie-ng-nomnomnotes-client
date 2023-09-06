import './SearchRestaurant.scss';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function SearchRestaurant ({ showSearchRestaurant, handleCancelAddRestaurantClick }) {

    return (
        <Slide direction="up" in={showSearchRestaurant} mountOnEnter unmountOnExit>
            <div className="search-restaurant">
                <IconButton
                aria-label="close"
                onClick={handleCancelAddRestaurantClick}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
                >
                    <CloseIcon />
                </IconButton>
                <div>
                    <h2 className="search-restaurant__title">Search Restaurant</h2>
                    {/* <button className="search-restaurant__close" onClick={handleCancelAddRestaurantClick}>
                        Close
                    </button> */}
                </div>
            </div>
        </Slide>
    );
}

export default SearchRestaurant;