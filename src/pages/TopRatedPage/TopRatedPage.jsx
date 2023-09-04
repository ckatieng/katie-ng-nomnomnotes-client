import axios from "axios";
import { useState, useEffect } from "react";
import "./TopRatedPage.scss";

function FavouritesPage () {
    // States
    const [topRatedItems, setTopRatedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Top Rated API URL
    const topRatedURL = "http://localhost:5050/ratings/top-rated";

    // GET request
    useEffect(() => {
        // GET array of 10 top-rated items
        axios.get(topRatedURL)
            .then((response) => {
                setTopRatedItems(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching top-rated items:", error);
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
                        <p>No items in the top-rated list.</p> 
                    ) : (
                        topRatedItems.map((item) => (
                            <li className="top-rated__restaurant" key={item.id}>
                                <div className="top-rated__restaurant-name">{item.google_places_id}</div>
                                <div className="top-rated__restaurant-rating">{item.average_rating}</div>
                            </li>
                        ))
                    )}
                </ol>
            )}
        </div>
    );
}

export default FavouritesPage;