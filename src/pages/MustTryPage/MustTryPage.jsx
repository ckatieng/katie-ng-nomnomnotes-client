import axios from 'axios';
import { useState, useEffect } from 'react';
import { fetchRestaurantDetails } from '../../utils/googlePlacesService';
import './MustTryPage.scss';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import SearchRestaurant from '../../components/SearchRestaurant/SearchRestaurant';
import CustomCheckbox from '../../components/CustomCheckbox/CustomCheckbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Close';
import burger from "../../assets/images/Burger.png";
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import config from '../../utils/config';

/*
 * MustTryPage Component
 * - Displays a list of must-try restaurants
 * - Allows users to add new restaurants and delete existing ones
 * - Allows marking restaurants as checked
 * 
 * Props:
 * 'showSearchRestaurant' prop: Boolean to show/hide the restaurant search component
 * 'handleAddRestaurantClick' prop: Function to handle adding a new restaurant
 * 'handleCancelAddRestaurantClick' prop: Function to handle canceling the addition of a new restaurant
 */

function MustTryPage ({ showSearchRestaurant, handleAddRestaurantClick, handleCancelAddRestaurantClick, mode }) {
    // States
    const [mustTryItems, setMustTryItems] = useState([]); // State for must-try restaurant items
    const [isLoading, setIsLoading] = useState(true); // State to track loading state
    const [isZoomed, setIsZoomed] = useState(false); // State to control zoom effect

    // Must-Try API URL
    const mustTryUrl = `${config.serverUrl}/api/must-try`;

    // Function to update the must-try list from the server
    // const updateMustTryList = () => {
    //     // Send a GET request to fetch must-try items
    //     axios.get(mustTryUrl)
    //         .then((response) => {
    //             // Map over the must-try items and fetch restaurant names
    //             Promise.all(
    //                 response.data.map(async (item) => {
    //                     // Fetch the restaurant name for each item
    //                     const restaurantName = await fetchRestaurantName(item.google_places_id);
    //                     // Return an object that includes the item and its restaurant name
    //                     return { ...item, restaurantName };
    //                 })
    //             ).then((itemsWithNames) => {
    //                 // Set the state with must-try items that now include restaurant names
    //                 setMustTryItems(itemsWithNames);
    //                 setIsLoading(false);
    //             });
    //         })
    //         .catch((err) => {
    //             console.error(`Error fetching or setting restaurant names: ${err}`);
    //             setIsLoading(false);
    //         });
    // }

    const updateMustTryList = () => {
        // Send a GET request to fetch must-try items
        axios.get(mustTryUrl)
            .then((response) => {
                // Map over the must-try items and fetch restaurant names
                Promise.all(
                    response.data.map(async (item) => {
                        // Fetch the restaurant name and city for each item
                        const restaurantDetails = await fetchRestaurantDetails(item.google_places_id);
                        const { name: restaurantName, city } = restaurantDetails;
                        // Return an object that includes the item, restaurant name, and city
                        return { ...item, restaurantName, city };
                    })
                ).then((itemsWithNames) => {
                    // Group restaurants by city
                    const groupedRestaurants = itemsWithNames.reduce((acc, restaurant) => {
                        // Extract the city name from the restaurant data
                        const cityName = restaurant.city;
                    
                        // If the city name is not a key in the accumulator, create a new array for that city
                        if (!acc[cityName]) {
                            acc[cityName] = [];
                        }
                    
                        // Push the current restaurant to the corresponding city array in the accumulator
                        acc[cityName].push(restaurant);
                    
                        return acc;
                    }, {});

                    // Set the state with grouped and sorted restaurants
                    setMustTryItems(groupedRestaurants);
                    setIsLoading(false);
                });
            })
            .catch((err) => {
                console.error(`Error fetching or setting restaurant names: ${err}`);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        // Fetch the initial must-try items when the component mounts
        updateMustTryList();
        
        // Set isZoomed to true when the component mounts for zoom effect
        setIsZoomed(true);
        return () => {
            // Cleanup function to set isZoomed to false when the component unmounts
            setIsZoomed(false);
        };
    }, []);

    // Function to handle when the delete button is clicked
    const deleteItemHandler = (restaurantId) => {
        // axios.delete(`${mustTryUrl}/${restaurantId}`)
        //     .then((response) => {
        //         // Remove the deleted item from the local state
        //         console.log('prevItems before update:', mustTryItems);
        //         setMustTryItems((prevItems) =>
        //             prevItems.filter((item) => item.id !== restaurantId)
        //         );
        //         console.log('mustTryItems after update:', mustTryItems);
        //     })
        //     .catch((err) => {
        //         console.error(`Error deleting items: ${err}`);
        //     });

        axios.delete(`${mustTryUrl}/${restaurantId}`)
            .then((response) => {
                // Create a new object without the deleted restaurant
                const updatedMustTryItems = { ...mustTryItems };

                // Loop through cities and remove the restaurant from the corresponding city array
                for (const city in updatedMustTryItems) {
                    updatedMustTryItems[city] = updatedMustTryItems[city].filter(
                        (restaurant) => restaurant.id !== restaurantId
                    );

                    // If the city array is empty after removal, remove the city from the object
                    if (updatedMustTryItems[city].length === 0) {
                        delete updatedMustTryItems[city];
                    }
                }

                // Set the state with the updated object
                setMustTryItems(updatedMustTryItems);
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
                    {isLoading ? (
                        // Display loading while fetching data
                        <LoadingSpinner />
                    ) : (
                        <>
                            {/* Must-Try Items (checkboxes) */}
                            <div className="must-try__checkboxes">
                                {Object.keys(mustTryItems).length === 0 || 
                                    (Object.keys(mustTryItems).length > 0 && 
                                    Object.values(mustTryItems).every(restaurantsInCity => restaurantsInCity.length === 0)) ? (

                                // {mustTryItems.length === 0 ? (
                                    // Display an empty state message when the list is empty
                                    <div className="must-try__empty-state">
                                        <img className="must-try__empty-state-img" src={burger} alt="burger" />
                                        <h3 className="must-try__empty-state-title">No Restaurants Yet!</h3>
                                        <p className="must-try__empty-state-paragraph">
                                            Time to discover new restaurants & add them to your must-try list.
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                    <h2 className="must-try__title">Must-Try List</h2>
                                    {/* {mustTryItems.map((item) => (
                                        <div className={`must-try__item ${mode === 'dark' ? 'must-try__item-dark-mode' : ''}`} key={item.id}>
                                            <CustomCheckbox 
                                                key={item.id} 
                                                itemId={item.id} 
                                                itemName={item.restaurantName}
                                                googlePlacesId={item.google_places_id}
                                                updateMustTryList={updateMustTryList}
                                                mode={mode} 
                                            />
                                            <div className="must-try__delete">
                                                <IconButton disableTouchRipple className="must-try__delete-icon" size="small" onClick={() => deleteItemHandler(item.id)} style={{ color:'#73649b' }}>
                                                    <DeleteIcon fontSize="inherit"/>
                                                </IconButton>
                                            </div>
                                        </div>
                                    ))} */}

                                    {Object.entries(mustTryItems).map(([city, restaurantsInCity]) => (
                                        <div key={city}>
                                            <h3 className={`must-try__city ${mode === 'dark' ? 'must-try__city-dark-mode' : ''}`}>{city}</h3>

                                            {restaurantsInCity.map((restaurant) => (
                                                <div className={`must-try__item ${mode === 'dark' ? 'must-try__item-dark-mode' : ''}`} key={restaurant.id}>
                                                    <CustomCheckbox 
                                                        key={restaurant.id} 
                                                        itemId={restaurant.id} 
                                                        itemName={restaurant.restaurantName}
                                                        googlePlacesId={restaurant.google_places_id}
                                                        updateMustTryList={updateMustTryList}
                                                        mode={mode} 
                                                    />
                                                    <div className="must-try__delete">
                                                        <IconButton disableTouchRipple className="must-try__delete-icon" size="small" onClick={() => deleteItemHandler(restaurant.id)} style={{ color:'#73649b' }}>
                                                            <DeleteIcon fontSize="inherit"/>
                                                        </IconButton>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                    </>
                                )}
                            </div>
                        </>
                    )}

                    {/* Floating Add Button */}
                    <Zoom in={isZoomed} timeout={300}>
                        <Fab 
                            size="small" 
                            color="secondary" 
                            aria-label="add"
                            onClick={handleAddRestaurantClick}
                            sx={{
                                position: 'fixed',
                                bottom: 80,
                                right: 25,
                                backgroundColor: '#bd8eff',
                                '&:hover': {
                                    backgroundColor: '#ad86ea',
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