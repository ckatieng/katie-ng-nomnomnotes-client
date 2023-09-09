import './SearchRestaurant.scss';
import AddRestaurant from "../AddRestaurant/AddRestaurant";
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// import AddItem from "../AddItem/AddItem";

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
                {/* <AddItem /> */}
            </div>
        </Slide>
    );
}

export default SearchRestaurant;