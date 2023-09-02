import axios from "axios";
import { useState, useEffect } from "react";
import "./FavouritesPage.scss";

function FavouritesPage () {
    // States
    const [favouriteItems, setFavouriteItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Favourites API URL
    const favouritesURL = "http://localhost:5050/visited";

    // GET request
    useEffect(() => {
        // GET array of all favourite items
        axios.get(favouritesURL)
            .then((response) => {
                setFavouriteItems(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching favourite items:", error);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="favourites">
            <h2 className="favourites__title">Favourites List</h2>
            {isLoading ? (
                // Display a loading message while fetching data
                <p>Loading...</p> 
            ) : (
                <ul className="favourites__list">
                    {favouriteItems.length === 0 ? (
                        // Display an empty state message when the list is empty
                        <p>No items in the favourites list.</p> 
                    ) : (
                        favouriteItems.map((item) => (
                            <li key={item.id}>
                                {item.google_places_id}
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
}

export default FavouritesPage;