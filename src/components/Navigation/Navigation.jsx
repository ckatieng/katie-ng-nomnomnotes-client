import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navigation.scss';
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import RamenIcon from '@mui/icons-material/RamenDiningSharp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useDarkMode } from '../DarkModeProvider/DarkModeProvider';

/*
 * Navigation Component
 * - Provides a bottom navigation bar with icons and labels for different routes
 * - Allows users to navigate between different pages of the app
 *
 * Props:
 * 'mode' prop: the current color mode ('dark' or 'light') for the theme
 */

function Navigation() {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const { isDarkMode } = useDarkMode();

    return (
        <div style={{ display: location.pathname === '/' || location.pathname === '/must-try' || location.pathname === '/favourites' || location.pathname === '/top-rated' || location.pathname === '/visited' ? 'block' : 'none' }}>
        
        <BottomNavigation
            className={`bottom-navigation ${isDarkMode ? 'bottom-navigation__dark-mode' : ''}`}
            sx={{ 
                position: 'fixed', 
                bottom: 0, 
                left: 0, 
                right: 0,
                backgroundColor: isDarkMode ? '#121212' : '#eaecef',
                // navigation labels
                '& .MuiBottomNavigationAction-label': {
                    fontWeight: '600',
                    fontSize: '11px',
                    color: isDarkMode ? '#74787a' : '#818589', 
                },
                // selected navigation label
                '& .MuiBottomNavigationAction-label.Mui-selected': {
                    fontSize: '11px',
                    color: '#a275f9',
                },
                // selected navigation icon
                '& .MuiBottomNavigationAction-root.Mui-selected .MuiSvgIcon-root': {
                    color: isDarkMode ? '#b292ff' : '#a275f9',
                },
                // navigation icons
                '& .MuiBottomNavigationAction-root': {
                    color: isDarkMode ? '#989c9e' : '#686868',   
                },
                // selection effect
                '& .MuiBottomNavigationAction-root.Mui-selected': {
                    color: isDarkMode ? '#b292ff' : '#a275f9',
                },
                
            }}
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);

                // Use the navigate function to change the route
                switch (newValue) {
                    case 0:
                        navigate('/must-try');
                        break;
                    case 1:
                        navigate('/favourites');
                        break;
                    case 2:
                        navigate('/top-rated');
                        break;
                    case 3:
                        navigate('/visited');
                        break;
                    default:
                        break;
                }
            }}
        >
            <BottomNavigationAction 
                label="Must-Try" 
                icon={<RamenIcon />} 
            />
            <BottomNavigationAction 
                label="Favourites" 
                icon={
                    <FontAwesomeIcon 
                        icon={faHeart} 
                        // className="bottom-navigation__heart"/>
                        className={`bottom-navigation__heart ${isDarkMode ? 'bottom-navigation__heart-dark-mode' : ''}`}
                    />
                } 
            />
            <BottomNavigationAction 
                label="Top 10" 
                icon={
                    <FontAwesomeIcon 
                        icon={faStar} 
                        className={`bottom-navigation__icon ${isDarkMode ? 'bottom-navigation__icon-dark-mode' : ''}`}
                    />
                } 
            />
            <BottomNavigationAction 
                label="Visited" 
                icon={
                    <FontAwesomeIcon 
                        icon={faClockRotateLeft} 
                        className={`bottom-navigation__icon ${isDarkMode ? 'bottom-navigation__icon-dark-mode' : ''}`}
                    />
                } 
            />
        </BottomNavigation>

        </div>
    );
}

export default Navigation;