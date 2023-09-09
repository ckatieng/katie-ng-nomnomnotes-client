
import { useState, useMemo, createContext} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Box from '@mui/material/Box';

import { Fragment } from "react";
import { Link } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui//icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import ListItemIcon from '@mui/material/ListItemIcon';
import Location from "../Location/Location";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function ToggleColorMode({ children, showSearchRestaurant, mode, setMode }) {  
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),[setMode]
    );
  
    const getDesignTokens = (mode) => ({
        palette: {
            mode,
            ...(mode === 'light'
                ? {
                    // palette values for light mode
                    // primary: '#F3F6FC',
                    // divider: 'rgba(0,0,0,0.05)',
                    // text: {
                    //     // primary: '#73649b',
                    //     // secondary: grey[800],
                    // },
                    background: {
                        default: '#f3f6fc',
                        // paper: lightModeBackgroundColor, 
                    },
                    }
                : {
                    // palette values for dark mode
                    // primary: deepOrange,
                    // divider: 'rgba(255,255,255,0.4)',
                    background: {
                        default: '#212121',
                        // paper: deepOrange[900],
                    },
                    // text: {
                    //     // primary: '#bc9df9',
                    //     // secondary: grey[500],
                    // },
                }),
        },
        typography: {
            fontFamily: 'Montserrat, sans-serif',
        },
    });
  
    const updatedTheme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);





    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLocation = () => {
        <Location />
    }



    
  
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={updatedTheme}>
                {!showSearchRestaurant && (
                    <Box
                        sx={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        // bgcolor: 'background.default',
                        // color: 'text.primary',
                        borderRadius: 1,
                        // p: 3,
                        pt: '15px',
                        pl: '10px',
                        }}
                    >
                    {/* {mode} mode */}
                        <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                        <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                            <SettingsIcon />
                        </IconButton>


                        <Fragment>
                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <SettingsIcon sx={{ width: 32, height: 32 }}></SettingsIcon>
                                </IconButton>
                                </Tooltip>
                            </Box>
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
                                    '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                    },
                                    '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                    },
                                },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                
                                <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <Brightness4Icon fontSize="small" />
                                </ListItemIcon>
                                Dark Mode
                                </MenuItem>
                                <MenuItem onClick={handleLocation}>
                                <Link to="/location">
                                <ListItemIcon>
                                    <SettingsIcon fontSize="small" />
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


                    </Box>
                )}
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
  }
  
  export default ToggleColorMode;