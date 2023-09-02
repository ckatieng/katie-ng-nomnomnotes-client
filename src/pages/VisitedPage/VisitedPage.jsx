import axios from "axios";
import { useState, useEffect } from "react";
import "./VisitedPage.scss";

function VisitedPage () {
    // States
    const [visitedItems, setVisitedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Visited API URL
    const visitedURL = "http://localhost:5050/visited";

    // GET request
    useEffect(() => {
        // GET array of all visited items
        axios.get(visitedURL)
            .then((response) => {
                setVisitedItems(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching visited items:", error);
                setIsLoading(false);
            });
    }, []);

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
                        <p>No items in the visited list.</p> 
                    ) : (
                        visitedItems.map((item) => (
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

export default VisitedPage;