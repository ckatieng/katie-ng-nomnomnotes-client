import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.scss";
import MustTryPage from "../src/pages/MustTryPage/MustTryPage";
import FavouritesPage from "../src/pages/FavouritesPage/FavouritesPage";
import TopRatedPage from "../src/pages/TopRatedPage/TopRatedPage";
import VisitedPage from "../src/pages/VisitedPage/VisitedPage";
import RestaurantDetails from "./components/RestaurantDetails/RestaurantDetails";
import LoadingScreen from "../src/components/LoadingScreen/LoadingScreen";
import Location from "../src/components/Location/Location";
import Navigation from "./components/Navigation/Navigation";
import AppBar from "./components/AppBar/AppBar";
import { CssBaseline } from "@mui/material";

/*
 * App.jsx
 * - Represents the main component of the application
 * - Contains loading screen, navigation and defines routes for different pages
 */

function App() {
    // State to track loading state
    const [isLoading, setIsLoading] = useState(true);
    // State to track whether "Add Restaurant" button is clicked
    const [showSearchRestaurant, setShowSearchRestaurant] = useState(false);
    // State to track light/dark mode
    const [mode, setMode] = useState('light');
    
    useEffect(() => {
        document.title = 'NomNom Notes';

        // Simulate content loading using useEffect
        setTimeout(() => {
            setIsLoading(false);
         }, 4000);
    }, []);

    // Function to handle when "Add Restaurant" button is clicked
    const handleAddRestaurantClick = () => {
        setShowSearchRestaurant(true);
    };

    // Function to handle when "Cancel" button is clicked in SearchRestaurant component
    const handleCancelAddRestaurantClick = () => {
        setShowSearchRestaurant(false);
    };

    return (
        <BrowserRouter>
            <div className="App">
                {isLoading && <LoadingScreen />}
                {!isLoading && (
                    <AppBar
                        showSearchRestaurant={showSearchRestaurant} 
                        mode={mode} 
                        setMode={setMode}>

                        <CssBaseline />
                        <Routes>
                            {/* Home Page */}
                            <Route path="/" element={
                                isLoading ? (
                                    <LoadingScreen />
                                ) : (
                                    <MustTryPage
                                        showSearchRestaurant={showSearchRestaurant}
                                        handleAddRestaurantClick={handleAddRestaurantClick}
                                        handleCancelAddRestaurantClick={handleCancelAddRestaurantClick}
                                        mode={mode}
                                    />
                                )}
                            />

                            {/* Must-Try Page */}
                            <Route path="/must-try" element={
                                <MustTryPage
                                    showSearchRestaurant={showSearchRestaurant}
                                    handleAddRestaurantClick={handleAddRestaurantClick}
                                    handleCancelAddRestaurantClick={handleCancelAddRestaurantClick}
                                    mode={mode}
                                />
                            }/>

                            {/* Restaurant Details */}
                            <Route path="/restaurant/:placeId" element={<RestaurantDetails />} />

                            {/* Favourites Page */}
                            <Route path="/favourites" element={<FavouritesPage />} />

                            {/* Top 10 Page */}
                            <Route path="/top-rated" element={<TopRatedPage />} />

                            {/* Visited Page */}
                            <Route path="/visited" element={<VisitedPage />} />

                            {/* Location */}
                            <Route path="/location" element={<Location />} />

                            {/* Catch-all to redirect to Home Page */}
                            <Route path="*" element={
                                <MustTryPage
                                    showSearchRestaurant={showSearchRestaurant}
                                    handleAddRestaurantClick={handleAddRestaurantClick}
                                    handleCancelAddRestaurantClick={handleCancelAddRestaurantClick}
                                    mode={mode}
                                />} 
                            />
                        </Routes>
                        {!showSearchRestaurant && <Navigation mode={mode} />}
                    </AppBar>
                )}
            </div>
        </BrowserRouter>
    );
}

export default App;
