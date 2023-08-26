import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';

/*
 * App.jsx
 * - Represents the main component of the application
 * - Contains header, footer and defines routes for different pages
 */

function App() {
    return (
        
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {/* Home Page */}
                    {/* <Route path="/" element={<MustTryPage />} /> */}

                    {/* Must-Try Page */}
                    {/* <Route path="/musttry" element={<MustTryPage />} /> */}

                    {/* Single Restaurant Details */}
                    {/* <Route path="/musttry/:id" element={<RestaurantDetails />} /> */}

                    {/* Delete Restaurant from MustTryPage */}
                    {/* <Route path="/musttry/:id/delete" element={<MustTryPage/>} /> */}

                    {/* Favourites Page */}
                    {/* <Route path="/favourites" element={<FavouritesPage />} /> */}

                    {/* Single Restaurant Details */}
                    {/* <Route path="/favourites/:id" element={<RestaurantDetails />} /> */}

                    {/* Delete Restaurant from FavouritesPage */}
                    {/* <Route path="/favourites/:id/delete" element={<FavouritesPage />} /> */}

                    {/* Visited Page */}
                    {/* <Route path="/visited" element={<VisitedPage />} /> */}

                    {/* Single Restaurant Details */}
                    {/* <Route path="/visited/:id" element={<RestaurantDetails />} /> */}

                    {/* Delete Restaurant from VisitedPage */}
                    {/* <Route path="/visited/:id/delete" element={<VisitedPage />} /> */}

                    {/* Catch-all to redirect to Home Page */}
                    {/* <Route path="*" element={<MustTryPage />} /> */}
                </Routes>
            </div>
        </BrowserRouter>
        
    );
}

export default App;
