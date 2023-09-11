import './SearchRestaurant.scss';
import AddRestaurant from "../AddRestaurant/AddRestaurant";
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

/*
 * SearchRestaurant Component
 * - Displays a slide-up search restaurant interface
 * - Allows users to find and add a restaurant to their must-try list
 * 
 * Props:
 * 'showSearchRestaurant' prop: a boolean indicating whether to show the search restaurant interface
 * 'handleCancelAddRestaurantClick' prop: a function to handle the cancellation of adding a restaurant
 * 'updateMustTryList' prop: a function to update the list of must-try restaurants
 */

function SearchRestaurant ({ showSearchRestaurant, handleCancelAddRestaurantClick, updateMustTryList }) {

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
                    <h2 className="search-restaurant__title">Find a Restaurant</h2>
                </div>
                <AddRestaurant updateMustTryList={updateMustTryList} handleCancelAddRestaurantClick={handleCancelAddRestaurantClick}/>
            </div>
        </Slide>
    );
}

export default SearchRestaurant;