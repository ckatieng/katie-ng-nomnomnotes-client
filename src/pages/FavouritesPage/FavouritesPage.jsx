import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchRestaurantName } from "../../utils/googlePlacesService";
import "./FavouritesPage.scss";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Close';
import dessert from "../../assets/images/Dessert.png";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

/*
 * FavouritesPage Component
 * - Displays a list of user's favorite items
 * - Allows users to delete items from their favorites
 */

function FavouritesPage ({ mode }) {
    const location = useLocation();

    // States
    const [favouriteItems, setFavouriteItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Favourites API URL
    const favouritesURL = "http://localhost:5050/api/favourites";

    useEffect(() => {
        // Send a GET request to fetch favorite items
        axios.get(favouritesURL)
            .then((response) => {
                // Map over the favorite items and fetch restaurant names
                Promise.all(
                    response.data.map(async (item) => {
                        // Fetch the restaurant name for each item
                        const restaurantName = await fetchRestaurantName(item.google_places_id);
                        // Return an object that includes the item and its restaurant name
                        return { ...item, restaurantName };
                    })
                ).then((itemsWithNames) => {
                    // Set the state with favorite items that now include restaurant names
                    setFavouriteItems(itemsWithNames);
                    setIsLoading(false);
                });
            })
            .catch((err) => {
                console.error(`Error fetching or setting restaurant names: ${err}`);
                setIsLoading(false);
            });
    }, []);

    // Function to handle when the delete button is clicked
    const deleteItemHandler = (itemId) => {
        axios.delete(`${favouritesURL}/${itemId}`)
            .then((response) => {
                // Remove the deleted item from the local state
                setFavouriteItems((prevItems) =>
                    prevItems.filter((item) => item.id !== itemId)
                );
            })
            .catch((err) => {
                console.error(`Error deleting items: ${err}`);
            });
    }

    // Function to handle when the share icon is clicked
    const handleShareClick = () => {
        // Get the user's ID
        const userId = req.user.id;

        // Create a unique shareable link with the user's ID
        // const shareableLink = `${window.location.origin}${location.pathname}?userId=${userId}`;
        const shareableLink = `${window.location.origin}${location.pathname}`;

        // Copy the shareable link to clipboard
        navigator.clipboard.writeText(shareableLink)
            .then(() => {
                alert("Link copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy link: ", err);
            });
    }

    return (
        <div className="favourites">
            {isLoading ? (
                // Display loading while fetching data
                <LoadingSpinner />
            ) : (
                <>
                    <ul className="favourites__list">
                        {favouriteItems.length === 0 ? (
                            // Display an empty state message when the list is empty
                            <div className="favourites__empty-state">
                                <img className="favourites__empty-state-img" src={dessert} alt="dessert" />
                                <h3 className="favourites__empty-state-title">No Favourites Yet!</h3>
                                <p className="favourites__empty-state-paragraph">
                                    Try restaurants from your list & see if they are worthy to become a favourite.
                                </p>
                            </div>
                        ) : (
                            <>
                                <Box
                                    sx={{
                                    display: 'flex',
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    borderRadius: 1,
                                    }}
                                >
                                    <div className="favourites__share-icon">
                                        <FontAwesomeIcon 
                                            style={{
                                                fontSize: '18px',
                                            }}
                                            icon={faArrowUpFromBracket} 
                                            onClick={handleShareClick} 
                                            className="favourites__share-icon"
                                        />
                                    </div>
                                </Box>

                                <h2 className="favourites__title">Favourites List</h2>
                                {favouriteItems.map((item) => (
                                    // <li className={`favourite__item ${mode === 'dark' ? 'favourite__dark-mode' : ''}`} key={item.id}>
                                    <li className="favourites__item" key={item.id}>
                                        <Link to={`/restaurant/${item.google_places_id}`} className="favourites__item-name">{item.restaurantName}</Link> 
                                        <div className="favourites__delete">
                                            <IconButton disableTouchRipple className="favourites__delete-icon" size="small" onClick={() => deleteItemHandler(item.id)} style={{ color:'#73649b' }}>
                                                <DeleteIcon fontSize="inherit"/>
                                            </IconButton>
                                        </div>
                                    </li>
                                ))}
                            </>
                        )}
                    </ul>
                </>
            )}
        </div>
    );
}

export default FavouritesPage;