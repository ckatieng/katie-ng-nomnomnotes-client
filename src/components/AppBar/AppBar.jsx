
import { useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useDarkMode } from '../DarkModeProvider/DarkModeProvider';
import './AppBar.scss';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Box from '@mui/material/Box';
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import PlaceIcon from '@mui/icons-material/PlaceSharp';

/*
 * AppBar Component
 * - Provides features like toggling dark mode, displaying user menu, and links to other pages
 *
 * Props:
 * 'children' prop: the children components to be rendered within the app bar
 * 'showSearchRestaurant' prop: indicates whether the search restaurant feature is showing
 */

function AppBar({ children, showSearchRestaurant }) {  
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const navigate = useNavigate();
    const location = useLocation();

    // State and functions for handling the user menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLocation = () => {
        navigate('/location');
    }
  
    return (
        <>
            {!showSearchRestaurant && (
                <div className="app-bar" style={{ display: location.pathname === '/' || location.pathname === '/must-try' || location.pathname === '/favourites' || location.pathname === '/top-rated' || location.pathname === '/visited' ? 'block' : 'none' }}>
                    <Box
                        sx={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        borderRadius: 1,
                        }}
                    >
                        <div>
                            <IconButton 
                                onClick={toggleDarkMode} 
                                color="inherit"
                                className={`app-bar__icon ${isDarkMode ? 'app-bar__icon-dark-mode' : ''}`}
                                sx={{ 
                                    color: isDarkMode ? '#ffffff' : '#000000',
                                }}
                            >
                                {/* Render the appropriate icon based on isDarkMode */}
                                {isDarkMode ? (
                                    <Brightness7Icon />
                                ) : (
                                    <Brightness4Icon />   
                                )}
                            </IconButton>
                        </div>
                            
                        <div style={{ display: location.pathname === '/' || location.pathname === '/must-try' || location.pathname === '/favourites' || location.pathname === '/top-rated' || location.pathname === '/visited' ? 'block' : 'none' }}>
                            <Fragment>
                                <IconButton
                                    className={`app-bar__icon ${isDarkMode ? 'app-bar__icon-dark-mode' : ''}`}
                                    color="inherit"
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ 
                                        ml: 0.5,
                                        color: isDarkMode ? '#ffffff' : '#000000',
                                    }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                    }}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        minWidth: 200,
                                        backgroundColor: isDarkMode ? '#000000' : '#ffffff',
                                        color: isDarkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.7)',
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                    },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={handleLocation}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.04)',
                                            }
                                        }}
                                    >
                                        <Link className="app-bar__link" to="/location">
                                            <ListItemIcon
                                                sx={{
                                                    color: isDarkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.7)',
                                                }}
                                            >
                                                <PlaceIcon fontSize="small" />
                                            </ListItemIcon>
                                            Location
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.04)',
                                            }
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                color: isDarkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.7)',
                                            }}
                                        >
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </Fragment>
                        </div> 
                    </Box>
                </div>
            )}
                {/* Render children components */}
                {children}
        </>
    );
  }
  
  export default AppBar;