import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchRestaurantName } from "../../utils/googlePlacesService";
import "./TopRatedPage.scss";
import paella from "../../assets/images/Paella.png";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

function TopRatedPage () {
    // States
    const [topRatedItems, setTopRatedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Top-Rated API URL
    const topRatedURL = "http://localhost:5050/api/ratings/top-rated";

    useEffect(() => {
        // Send a GET request to fetch top-rated items
        axios.get(topRatedURL)
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
    const mustTryURL = "http://localhost:5050/api/must-try";

    // Function to handle when the add button is clicked
    const addItemHandler = (googlePlacesId) => {
        
        // Send a POST request to add the restaurant to the must-try list
        axios.post(mustTryURL, {google_places_id: googlePlacesId})
            .then((response) => {
                console.log("Restaurant added to must-try list:", response.data);

                // Update the must-try list state to include the newly added restaurant
                // updateMustTryList();
            })
            .catch((err) => {
                console.error(`Error adding must-try item: ${err}`);
            });
    }

    return (
        <div className="top-rated">
            
            {isLoading ? (
                // Display a loading message while fetching data
                <p>Loading...</p> 
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
                                        <div className="top-rated__item-rating">{item.averageRating}</div>
                                    </div>
                                    
                                </li>
                            ))}
                        </>
                    )}
                </ol>
            )}
        </div>
    );
}

export default TopRatedPage;