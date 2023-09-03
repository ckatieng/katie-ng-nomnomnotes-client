import axios from "axios";
import { useState, useEffect } from 'react';
import './MustTryPage.scss';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import SearchRestaurant from '../../components/SearchRestaurant/SearchRestaurant';
import CustomCheckbox from '../../components/CustomCheckbox/CustomCheckbox';

function MustTryPage ({ showSearchRestaurant, handleAddRestaurantClick, handleCancelAddRestaurantClick }) {
    // States
    const [mustTryItems, setMustTryItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isZoomed, setIsZoomed] = useState(false);
    // const [showSearch, setShowSearch] = useState(false);

    // Must-Try API URL
    const mustTryURL = "http://localhost:5050/must-try";

    // Function to update the must-try list
    const updateMustTryList = () => {
        // Fetch the latest must-try items
        axios.get(mustTryURL)
            .then((response) => {
                setMustTryItems(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching must-try items:", error);
                setIsLoading(false);
            });
    }

    // GET request
    useEffect(() => {
        // Fetch the initial must-try items
        updateMustTryList();

        setIsZoomed(true);
        return () => {
            setIsZoomed(false);
        };
    }, []);

    
    // useEffect(() => {
    //     setIsZoomed(true);
    //     return () => {
    //         setIsZoomed(false);
    //     };
    // }, []);

    return (
        <div className="must-try">
            {showSearchRestaurant ? (
                <SearchRestaurant 
                    showSearchRestaurant={showSearchRestaurant} 
                    handleCancelAddRestaurantClick={handleCancelAddRestaurantClick} />
            ) : (
                <>
                    <h2 className="must-try__title">Must-Try List</h2>

                    {/* Must-Try Items (checkboxes) */}
                    {isLoading ? (
                        // Display a loading message while fetching data
                        <p>Loading...</p> 
                    ) : (
                        <div className="must-try__checkboxes">
                            {mustTryItems.length === 0 ? (
                                // Display an empty state message when the list is empty
                                <p>No items in the must-try list.</p> 
                            ) : (
                                mustTryItems.map((item) => (
                                    <CustomCheckbox 
                                        key={item.id} 
                                        itemId={item.id} 
                                        itemName={item.google_places_id}
                                        updateMustTryList={updateMustTryList} 
                                    />
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


