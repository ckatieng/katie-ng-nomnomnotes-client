import AppBar from '../AppBar/AppBar';
import Navigation from '../Navigation/Navigation';
import { CssBaseline } from '@mui/material';

function MainLayout({ showSearchRestaurant, mode, setMode, children }) {
    return (
        <div>
            <AppBar 
                showSearchRestaurant={showSearchRestaurant} 
                mode={mode} 
                setMode={setMode}
            >
                <CssBaseline />
                {children}
                {!showSearchRestaurant && <Navigation mode={mode} />}
            </AppBar>
        </div>
    );
}

export default MainLayout;