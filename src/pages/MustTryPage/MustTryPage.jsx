import { useState, useEffect } from 'react';
import './MustTryPage.scss';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import SearchRestaurant from '../../components/SearchRestaurant/SearchRestaurant';

function MustTryPage ({ showSearchRestaurant, handleAddRestaurantClick, handleCancelAddRestaurantClick }) {
    const [isZoomed, setIsZoomed] = useState(false);
    // const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        setIsZoomed(true);
        return () => {
            setIsZoomed(false);
        };
    }, []);

    

    return (
        <div className="must-try">
            {showSearchRestaurant ? (
                <SearchRestaurant 
                    showSearchRestaurant={showSearchRestaurant} 
                    handleCancelAddRestaurantClick={handleCancelAddRestaurantClick} />
            ) : (
                <>
                    <h2 className="must-try__title">Must-Try List</h2>
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