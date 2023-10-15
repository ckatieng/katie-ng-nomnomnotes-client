
import { useState, useMemo, createContext} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
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
import Location from "../Location/Location";
import PlaceIcon from '@mui/icons-material/PlaceSharp';

// Create a context for controlling color mode
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

/*
 * AppBar Component
 * - Provides features like toggling dark mode, displaying user menu, and links to other pages
 *
 * Props:
 * 'children' prop: the children components to be rendered within the app bar
 * 'showSearchRestaurant' prop: indicates whether the search restaurant feature is showing
 * 'mode' prop: the current color mode ('light' or 'dark') for the theme
 * 'setMode' prop: a function to set the color mode
 */

function AppBar({ children, showSearchRestaurant, mode, setMode }) {  
    const navigate = useNavigate();
    const location = useLocation();

    // Create a context for controlling color mode
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),[setMode]
    );
    
    // Define design tokens for the theme based on the color mode
    const getDesignTokens = (mode) => ({
        palette: {
            mode,
            ...(mode === 'light'
                ? {
                    background: {
                        default: '#f3f6fc',
                    },
                    }
                : {
                    background: {
                        default: '#212121',
                    },
                }),
        },
        typography: {
            fontFamily: 'Montserrat, sans-serif',
        },
    });
    
    // Create an updated theme based on the color mode
    const updatedTheme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

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
        // Provide the color mode context and apply the theme
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={updatedTheme}>
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
                                <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                                    {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                                </IconButton>
                            </div>
                                
                            <div style={{ display: location.pathname === '/' || location.pathname === '/must-try' || location.pathname === '/favourites' || location.pathname === '/top-rated' || location.pathname === '/visited' ? 'block' : 'none' }}>
                                <Fragment>
                                    <IconButton
                                        color="inherit"
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 0.5 }}
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
                                        <MenuItem onClick={handleLocation}>
                                            <Link className="app-bar__link" to="/location">
                                                <ListItemIcon>
                                                    <PlaceIcon fontSize="small" />
                                                </ListItemIcon>
                                                Location
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <ListItemIcon>
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
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
  }
  
  export default AppBar;