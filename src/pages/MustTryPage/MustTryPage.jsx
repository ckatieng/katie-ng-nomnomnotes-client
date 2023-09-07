import axios from "axios";
import { useState, useEffect } from 'react';
import { fetchRestaurantName } from "../../utils/googlePlacesService";
import './MustTryPage.scss';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import SearchRestaurant from '../../components/SearchRestaurant/SearchRestaurant';
import CustomCheckbox from '../../components/CustomCheckbox/CustomCheckbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import paella from "../../assets/images/Paella.png";

function MustTryPage ({ showSearchRestaurant, handleAddRestaurantClick, handleCancelAddRestaurantClick }) {
    // States
    const [mustTryItems, setMustTryItems] = useState([]); // State for must-try restaurant items
    const [isLoading, setIsLoading] = useState(true); // State to track loading state
    const [isZoomed, setIsZoomed] = useState(false); // State to control zoom effect

    // Must-Try API URL
    const mustTryURL = "http://localhost:5050/api/must-try";

    // Function to update the must-try list from the server
    const updateMustTryList = () => {
        // Fetch the latest must-try items
        // axios.get(mustTryURL)
        //     .then((response) => {
        //         setMustTryItems(response.data);
        //         setIsLoading(false);
        //     })
        //     .catch((err) => {
        //         console.error(`Error fetching must-try items: ${err}`);
        //         setIsLoading(false);
        //     });

        // Send a GET request to fetch must-try items
        axios.get(mustTryURL)
            .then((response) => {
                // Map over the must-try items and fetch restaurant names
                Promise.all(
                    response.data.map(async (item) => {
                        // Fetch the restaurant name for each item
                        const restaurantName = await fetchRestaurantName(item.google_places_id);
                        // Return an object that includes the item and its restaurant name
                        return { ...item, restaurantName };
                    })
                ).then((itemsWithNames) => {
                    // Set the state with must-try items that now include restaurant names
                    setMustTryItems(itemsWithNames);
                    setIsLoading(false);
                });
            })
            .catch((err) => {
                console.error(`Error fetching or setting restaurant names: ${err}`);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        // Fetch the initial must-try items when the component mounts
        updateMustTryList();
        
        // Set isZoomed to true when the component mounts (for zoom effect)
        setIsZoomed(true);
        return () => {
            // Cleanup function to set isZoomed to false when the component unmounts
            setIsZoomed(false);
        };
    }, []);

    // Function to handle when the delete button is clicked
    const deleteItemHandler = (itemId) => {
        axios.delete(`${mustTryURL}/${itemId}`)
            .then((response) => {
                // Remove the deleted item from the local state
                setMustTryItems((prevItems) =>
                    prevItems.filter((item) => item.id !== itemId)
                );
            })
            .catch((err) => {
                console.error(`Error deleting items: ${err}`);
            });
    }

    return (
        <div className="must-try">
            {showSearchRestaurant ? (
                <SearchRestaurant 
                    showSearchRestaurant={showSearchRestaurant} 
                    handleCancelAddRestaurantClick={handleCancelAddRestaurantClick}
                    updateMustTryList={updateMustTryList} />
            ) : (
                <>
                    <h2 className="visited__title">Must-Try List</h2>
                    {/* Must-Try Items (checkboxes) */}
                    {isLoading ? (
                        // Display a loading message while fetching data
                        <p>Loading...</p> 
                    ) : (
                        <div className="must-try__checkboxes">
                            {mustTryItems.length === 0 ? (
                                // Display an empty state message when the list is empty
                                <div className="must-try__empty-state">
                                    <img className="must-try__empty-state-img" src={paella} alt="paella" />
                                    <h3 className="must-try__empty-state-title">No Restaurants Yet!</h3>
                                    <p className="must-try__empty-state-paragraph">Time to discover new restaurants & add them to your must-try list.</p>
                                </div>
                            ) : (
                                mustTryItems.map((item) => (
                                    <div className="must-try__item" key={item.id}>
                                        <CustomCheckbox 
                                            key={item.id} 
                                            itemId={item.id} 
                                            itemName={item.restaurantName}
                                            googlePlacesId={item.google_places_id}
                                            updateMustTryList={updateMustTryList} 
                                        />
                                        <IconButton className="custom-checkbox__delete" onClick={() => deleteItemHandler(item.id)} color="inherit">
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* Floating Add Button */}
                    <Zoom in={isZoomed} timeout={300}>
                        <Fab 
                            size="small" 
                            color="secondary" 
                            aria-label="add"
                            onClick={handleAddRestaurantClick}
                            sx={{
                                position: 'absolute',
                                bottom: 70,
                                right: 30,
                                backgroundColor: '#EB72FF',
                                '&:hover': {
                                    backgroundColor: '#DD65F0',
                                },
                                boxShadow: '0px 3px 5px -1px rgba(112, 112, 112, 0.2), 0px 6px 10px 0px rgba(112, 112, 112, 0.14), 0px 1px 18px 0px rgba(112, 112, 112, 0.12)',
                            }}
                        >
                            <AddIcon />
                        </Fab>
                    </Zoom>
                </>
            )}
        </div> 
    );
}

export default MustTryPage;