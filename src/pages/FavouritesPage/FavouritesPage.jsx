import axios from 'axios';
import { useState, useEffect } from 'react';
import './FavouritesPage.scss';

function FavouritesPage () {
    // States
    const [favouriteItems, setFavouriteItems] = useState([]);

    // GET request
    useEffect(() => {
        // GET array of all favourite restaurants
        axios.get("http://localhost:5050/favourites")
            .then((response) => {
                setFavouriteItems(response.data);
            })
            .catch((error) => {
                console.error('Error fetching favourite items:', error);
            });
    }, []);

    return (
        <div className="favourites">
            <h2 className="favourites__title">Favourites List</h2>
            <ul className="favourites__list">
                {favouriteItems.map((item) => (
                    <li key ={item.id}>
                        {item.google_places_id}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FavouritesPage;