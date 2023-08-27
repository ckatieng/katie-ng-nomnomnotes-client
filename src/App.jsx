import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';

import { ThemeProvider } from '@mui/material/styles';
import MuiTheme from './components/MuiTheme/MuiTheme';
import MuiNavigation from './components/MuiNavigation/MuiNavigation';

import MustTryPage from '../src/pages/MustTryPage/MustTryPage';
import FavouritesPage from '../src/pages/FavouritesPage/FavouritesPage';
import VisitedPage from '../src/pages/VisitedPage/VisitedPage';
import NearbyPage from '../src/pages/NearbyPage/NearbyPage';


/*
 * App.jsx
 * - Represents the main component of the application
 * - Contains header, footer and defines routes for different pages
 */

function App() {
    return (
        <ThemeProvider theme={MuiTheme}>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        {/* Home Page */}
                        <Route path="/" element={<MustTryPage />} />
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

                    <MuiNavigation />
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;