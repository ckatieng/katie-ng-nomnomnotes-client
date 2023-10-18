import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchRestaurantName } from '../../utils/googlePlacesService';
import './VisitedPage.scss';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Close';
import dimsum from '../../assets/images/Dimsum.png';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import config from '../../utils/config';
import { useDarkMode } from '../../components/DarkModeProvider/DarkModeProvider';

/*
 * VisitedPage Component
 * - Displays a list of visited restaurants
 * - Allows users to delete items from their visited list
 */

function VisitedPage () {
    // States
    const [visitedItems, setVisitedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    // Visited API URL
    const visitedUrl = `${config.serverUrl}/api/visited`;

    useEffect(() => {
        // Send a GET request to fetch visited items
        axios.get(visitedUrl)
            .then((response) => {
                // Map over the visited items and fetch restaurant names
                Promise.all(
                    response.data.map(async (item) => {
                        // Fetch the restaurant name for each item
                        const restaurantName = await fetchRestaurantName(item.google_places_id);
                        // Return an object that includes the item and its restaurant name
                        return { ...item, restaurantName };
                    })
                ).then((itemsWithNames) => {
                    // Set the state with visited items that now include restaurant names
                    setVisitedItems(itemsWithNames);
                    setIsLoading(false);
                });
            })
            .catch((err) => {
                console.error(`Error fetching or setting restaurant names: ${err}`);
                setIsLoading(false);
            });
    }, [visitedUrl]);

    // Function to handle when the delete button is clicked
    const deleteItemHandler = (itemId) => {
        axios.delete(`${visitedUrl}/${itemId}`)
            .then((response) => {
                // Remove the deleted item from the local state
                setVisitedItems((prevItems) =>
                    prevItems.filter((item) => item.id !== itemId)
                );
            })
            .catch((err) => {
                console.error(`Error deleting items: ${err}`);
            });
    }

    return (
        <div className={`visited ${isDarkMode ? 'visited__dark-mode' : ''}`}>
            {isLoading ? (
                // Display loading while fetching data
                <LoadingSpinner />
            ) : (
                <ul className="visited__list">
                    {visitedItems.length === 0 ? (
                        // Display an empty state message when the list is empty
                        <div className="visited__empty-state">
                            <img className="visited__empty-state-img" src={dimsum} alt="dimsum" />
                            <h3 className={`visited__empty-state-title ${isDarkMode ? 'must-try__dark-mode' : ''}`}>No History Yet!</h3>
                            <p className={`visited__empty-state-paragraph ${isDarkMode ? 'must-try__dark-mode-text' : ''}`}>This list displays the restaurants you've visited, but did not favourite to help track your history.</p>
                        </div>
                    ) : (
                        <>
                            <h2 className="visited__title">Visited List</h2>
                            {visitedItems.map((item) => (
                                <li className={`visited__item ${isDarkMode ? 'visited__item-dark-mode' : ''}`} key={item.id}>
                                    <Link 
                                        to={`/restaurant/${item.google_places_id}`} 
                                        className={`visited__item-name ${isDarkMode ? 'visited__item-name-dark-mode' : ''}`}>
                                            {item.restaurantName}
                                    </Link> 
                                    <div className="visited__delete">
                                        <IconButton disableTouchRipple className="visited__delete-icon" size="small" onClick={() => deleteItemHandler(item.id)} style={{ color:'#73649b' }}>
                                            <DeleteIcon fontSize="inherit"/>
                                        </IconButton>
                                    </div>
                                </li>
                            ))}
                        </>
                    )}
                </ul>
            )}
        </div>
    );
}

export default VisitedPage;