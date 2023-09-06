import axios from "axios";
import { useState, useEffect } from "react";
import { fetchRestaurantName } from "../../utils/googlePlacesService";
import "./TopRatedPage.scss";
import burger from "../../assets/images/Burger.png";

function FavouritesPage () {
    // States
    const [topRatedItems, setTopRatedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Top Rated API URL
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

    return (
        <div className="top-rated">
            <h2 className="top-rated__title">Top 10 List</h2>
            {isLoading ? (
                // Display a loading message while fetching data
                <p>Loading...</p> 
            ) : (
                <ol className="top-rated__list">
                    {topRatedItems.length === 0 ? (
                        // Display an empty state message when the list is empty
                        <div className="must-try__empty-state">
                            <img className="must-try__empty-state-img" src={burger} alt="burger" />
                            <h3 className="must-try__empty-state-title">Top 10 is Empty!</h3>
                            <p className="must-try__empty-state-paragraph">Explore new restaurants, rate them & help create the top-rated list.</p>
                        </div>
                    ) : (
                        topRatedItems.map((item) => (
                            <li className="top-rated__item" key={item.id}>
                                <div className="top-rated__item-name">{item.restaurantName}</div>
                                <div className="top-rated__item-rating">{item.averageRating}</div>
                            </li>
                        ))
                    )}
                </ol>
            )}
        </div>
    );
}

export default FavouritesPage;