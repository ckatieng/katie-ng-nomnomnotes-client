import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchRestaurantName } from "../../utils/googlePlacesService";
import "./TopRatedPage.scss";
import paella from "../../assets/images/Paella.png";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import config from '../../utils/config';

/*
 * TopRatedPage Component
 * - Displays a list of top-rated restaurants (Top 10)
 * - Allows adding restaurants to the must-try list
 */

function TopRatedPage () {
    // States
    const [topRatedItems, setTopRatedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // State to control Snackbar open state and message
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // Top-Rated API URL
    const topRatedUrl = `${config.serverUrl}/api/ratings/top-rated`;

    useEffect(() => {
        // Send a GET request to fetch top-rated items
        axios.get(topRatedUrl)
            .then((response) => {
                // Map over the top-rated items and fetch restaurant names
                Promise.all(
                    response.data.map(async (item) => {
                        // Fetch the restaurant name for each item
                        const restaurantName = await fetchRestaurantName(item.google_places_id);
                        // Parse the average rating to a number and round it to the first decimal place
                        const averageRating = parseFloat(item.average_rating).toFixed(1);
                        // Return an object that includes the item and its restaurant name, and rounded rating
                        return { ...item, restaurantName, averageRating };
                    })
                ).then((itemsWithNames) => {
                    // Set the state with top-rated items that now include restaurant names
                    setTopRatedItems(itemsWithNames);
                    setIsLoading(false);
                });
            })
            .catch((err) => {
                console.error(`Error fetching or setting restaurant names: ${err}`);
                setIsLoading(false);
            });
    }, []);

    // Must-Try API URL
    const mustTryUrl = `${config.serverUrl}/api/must-try`;

    // Function to handle when the add button is clicked
    const addItemHandler = (googlePlacesId) => {
        
        // Send a POST request to add the restaurant to the must-try list
        axios.post(mustTryUrl, {google_places_id: googlePlacesId})
            .then((response) => {
                console.log("Restaurant added to must-try list:", response.data);

                // Show a success message in the Snackbar
                setSnackbarMessage('Successfully added to your must-try list!');
                setSnackbarOpen(true);
            })
            .catch((err) => {
                console.error(`Error adding must-try item: ${err}`);
                // Show an error message in the Snackbar
                setSnackbarMessage("It's already in your list!");
                setSnackbarOpen(true);
            });
    }

    return (
        <div className="top-rated">
            
            {isLoading ? (
                // Display loading while fetching data
                <LoadingSpinner />
            ) : (
                <ol className="top-rated__list">
                    {topRatedItems.length === 0 ? (
                        // Display an empty state message when the list is empty
                        <div className="must-try__empty-state">
                            <img className="must-try__empty-state-img" src={paella} alt="paella" />
                            <h3 className="must-try__empty-state-title">Top 10 is Empty!</h3>
                            <p className="must-try__empty-state-paragraph">Explore new restaurants, rate them & help create the top-rated list.</p>
                        </div>
                    ) : (
                        <>
                            <h2 className="top-rated__title">Top 10 List</h2>
                            {topRatedItems.map((item) => (
                                <li className="top-rated__item" key={item.id}>
                                    <div className="top-rated__add">
                                        <IconButton disableTouchRipple className="top-rated__add-icon" onClick={() => addItemHandler(item.google_places_id)} style={{ color:'#73649b' }}>
                                            <AddIcon fontSize="inherit"/>
                                        </IconButton>
                                    </div>
                                    <div className="top-rated__item-container">
                                        <Link to={`/restaurant/${item.google_places_id}`}>
                                            <div className="top-rated__item-name">{item.restaurantName}</div>
                                        </Link> 
                                        <div className="top-rated__item-rating">{item.averageRating}  
                                             <div className="top-rated__star-icon"><FontAwesomeIcon icon={faStar}/></div>
                                        </div>
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
                </ol>
            )}
        </div>
    );
}

export default TopRatedPage;