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
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import config from '../../utils/config';
import { useDarkMode } from "../../components/DarkModeProvider/DarkModeProvider";

/*
 * FavouritesPage Component
 * - Displays a list of user's favorite items
 * - Allows users to delete items from their favorites
 */

function FavouritesPage () {
    const location = useLocation();

    // States
    const [favouriteItems, setFavouriteItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isDarkMode } = useDarkMode();

    // State to control Snackbar open state and message
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // Favourites API URL
    const favouritesUrl = `${config.serverUrl}/api/favourites`;

    useEffect(() => {
        // Send a GET request to fetch favorite items
        axios.get(favouritesUrl)
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
    }, [favouritesUrl]);

    // Function to handle when the delete button is clicked
    const deleteItemHandler = (itemId) => {
        axios.delete(`${favouritesUrl}/${itemId}`)
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
        // Fetch the user info
        axios.get(`${config.serverUrl}/api/users`)
            .then((response) => {
                // Extract user ID from the response data
                const userId = response.data.id;

                // Create a unique shareable link with the user's ID
                const shareableLink = `${window.location.origin}${location.pathname}?userId=${userId}`;

                // Copy the shareable link to clipboard
                navigator.clipboard.writeText(shareableLink)
                    .then(() => {
                        // Show a success message in the Snackbar
                        setSnackbarMessage('Link copied to clipboard.');
                        setSnackbarOpen(true);
                    })
                    .catch((err) => {
                        console.error("Failed to copy link: ", err);
                    });
            })
            .catch((error) => {
                console.error("Error fetching user info: ", error);
            });
    }

    return (
        <div className={`favourites ${isDarkMode ? 'favourites__dark-mode' : ''}`}>
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
                                <h3 className={`favourites__empty-state-title ${isDarkMode ? 'must-try__dark-mode' : ''}`}>No Favourites Yet!</h3>
                                <p className={`favourites__empty-state-paragraph ${isDarkMode ? 'must-try__dark-mode-text' : ''}`}>
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
                                    <div>
                                        <FontAwesomeIcon 
                                            style={{
                                                fontSize: '18px',
                                            }}
                                            icon={faArrowUpFromBracket} 
                                            onClick={handleShareClick} 
                                            className={`favourites__share-icon ${isDarkMode ? 'favourites__share-icon-dark-mode' : ''}`}
                                        />
                                    </div>
                                </Box>

                                <h2 className="favourites__title">Favourites List</h2>
                                {favouriteItems.map((item) => (
                                    <li className={`favourites__item ${isDarkMode ? 'favourites__item-dark-mode' : ''}`} key={item.id}>
                                        <Link 
                                            to={`/restaurant/${item.google_places_id}`} 
                                            className={`favourites__item-name ${isDarkMode ? 'favourites__item-name-dark-mode' : ''}`}>
                                                {item.restaurantName}
                                        </Link> 
                                        <div className="favourites__delete">
                                            <IconButton disableTouchRipple className="favourites__delete-icon" size="small" onClick={() => deleteItemHandler(item.id)} style={{ color:'#73649b' }}>
                                                <DeleteIcon fontSize="inherit"/>
                                            </IconButton>
                                        </div>
                                    </li>
                                ))}

                                <Snackbar
                                    open={snackbarOpen}
                                    autoHideDuration={2000} 
                                    onClose={() => setSnackbarOpen(false)}
                                    TransitionComponent={Slide}
                                    message={snackbarMessage}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                    style={{ marginBottom: '60px' }}
                                />
                            </>
                        )}
                    </ul>
                </>
            )}
        </div>
    );
}

export default FavouritesPage;