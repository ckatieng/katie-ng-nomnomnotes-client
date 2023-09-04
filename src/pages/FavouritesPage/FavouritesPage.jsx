import axios from "axios";
import { useState, useEffect } from "react";
import "./FavouritesPage.scss";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function FavouritesPage () {
    // States
    const [favouriteItems, setFavouriteItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Favourites API URL
    const favouritesURL = "http://localhost:5050/favourites";

    // GET request
    useEffect(() => {
        // GET array of all favourite items
        axios.get(favouritesURL)
            .then((response) => {
                setFavouriteItems(response.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(`Error fetching favourite items: ${err}`);
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
                            <li className="favourites__item" key={item.id}>
                                <div className="favourites__item-name">{item.google_places_id}</div>
                                <IconButton onClick={() => deleteItemHandler(item.id)} color="inherit">
                                    <DeleteIcon />
                                </IconButton>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
}

export default FavouritesPage;