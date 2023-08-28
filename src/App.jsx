import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.scss';

import MustTryPage from '../src/pages/MustTryPage/MustTryPage';
import FavouritesPage from '../src/pages/FavouritesPage/FavouritesPage';
import VisitedPage from '../src/pages/VisitedPage/VisitedPage';
import NearbyPage from '../src/pages/NearbyPage/NearbyPage';
import LoadingScreen from '../src/components/LoadingScreen/LoadingScreen';

// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import MuiTheme from './components/MuiTheme/MuiTheme';
import MuiNavigation from './components/MuiNavigation/MuiNavigation';
import ToggleColorMode from './components/ToggleColorMode/ToggleColorMode';
import { CssBaseline } from '@mui/material';

/*
 * App.jsx
 * - Represents the main component of the application
 * - Contains navigation and defines routes for different pages
 */

function App() {
    const [isLoading, setIsLoading] = useState(true);

    // Simulate content loading using useEffect
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); 
    }, []);

    return (
        // <ThemeProvider theme={MuiTheme}>
        // <ToggleColorMode>
            
        <BrowserRouter>
            <div className="App">
                {isLoading && <LoadingScreen />}
                {!isLoading && (
                    <ToggleColorMode>
                    <CssBaseline />
                    <Routes>
                        {/* Home Page */}
                        <Route path="/" element={isLoading ? <LoadingScreen /> : <MustTryPage />} />
                        {/* <Route path="/" element={<MuiNavigation />} /> */}

                        {/* Must-Try Page */}
                        <Route path="/musttry" element={<MustTryPage />} />

                        {/* Single Restaurant Details */}
                        {/* <Route path="/musttry/:id" element={<RestaurantDetails />} /> */}

                        {/* Delete Restaurant from MustTryPage */}
                        {/* <Route path="/musttry/:id/delete" element={<MustTryPage/>} /> */}

                        {/* Favourites Page */}
                        <Route path="/favourites" element={<FavouritesPage />} />

                        {/* Single Restaurant Details */}
                        {/* <Route path="/favourites/:id" element={<RestaurantDetails />} /> */}

                        {/* Delete Restaurant from FavouritesPage */}
                        {/* <Route path="/favourites/:id/delete" element={<FavouritesPage />} /> */}

                        {/* Visited Page */}
                        <Route path="/visited" element={<VisitedPage />} />

                        {/* Single Restaurant Details */}
                        {/* <Route path="/visited/:id" element={<RestaurantDetails />} /> */}

                        {/* Delete Restaurant from VisitedPage */}
                        {/* <Route path="/visited/:id/delete" element={<VisitedPage />} /> */}

                        {/* Nearby Page */}
                        <Route path="/nearby" element={<NearbyPage />} />

                        {/* Catch-all to redirect to Home Page */}
                        {/* <Route path="*" element={<MustTryPage />} /> */}
                    </Routes>
                        {/* {!isLoading && <MuiNavigation />} */}
                    <MuiNavigation />
                    </ToggleColorMode>
                )}
            </div>
        </BrowserRouter>
        // </ToggleColorMode>
        // </ThemeProvider>
    );
}

export default App;