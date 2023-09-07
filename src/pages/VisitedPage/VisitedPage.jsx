import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchRestaurantName } from "../../utils/googlePlacesService";
import "./VisitedPage.scss";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import dimsum from "../../assets/images/Dimsum.png";

function VisitedPage () {
    // States
    const [visitedItems, setVisitedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Visited API URL
    const visitedURL = "http://localhost:5050/api/visited";

    useEffect(() => {
        // Send a GET request to fetch visited items
        axios.get(visitedURL)
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
    }, []);

    // Function to handle when the delete button is clicked
    const deleteItemHandler = (itemId) => {
        axios.delete(`${visitedURL}/${itemId}`)
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
        <div className="visited">
            <h2 className="visited__title">Visited List</h2>
            {isLoading ? (
                // Display a loading message while fetching data
                <p>Loading...</p> 
            ) : (
                <ul className="visited__list">
                    {visitedItems.length === 0 ? (
                        // Display an empty state message when the list is empty
                        <div className="visited__empty-state">
                            <img className="visited__empty-state-img" src={dimsum} alt="dimsum" />
                            <h3 className="visited__empty-state-title">No History Yet!</h3>
                            <p className="visited__empty-state-paragraph">This list displays the restaurants you've visited, but did not favourite to help track your history.</p>
                        </div>
                    ) : (
                        visitedItems.map((item) => (
                            <li className="visited__item" key={item.id}>
                                <Link to={`/restaurant/${item.google_places_id}`} className="visited__item-name">{item.restaurantName}</Link> 
                                <IconButton className="visited__delete" onClick={() => deleteItemHandler(item.id)} color="inherit">
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

export default VisitedPage;