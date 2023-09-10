
import { useState, useMemo, createContext} from 'react';
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
import IosShareIcon from '@mui/icons-material/IosShare';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function AppBar({ children, showSearchRestaurant, mode, setMode }) {  
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
                    // primary: deepPurple[500],
                    // divider: 'rgba(0,0,0,0.05)',
                    // text: {
                    //     primary: '#a275f9',
                    //     secondary: '#ad86ea',
                    // },
                    background: {
                        default: '#f3f6fc',
                        // paper: lightModeBackgroundColor, 
                    },
                    }
                : {
                    // palette values for dark mode
                    // primary: deepPurple[500],
                    // divider: 'rgba(255,255,255,0.4)',
                    background: {
                        default: '#212121',
                        // paper: deepOrange[900],
                    },
                    // text: {
                    //     primary: '#bd8eff',
                    //     secondary: 'white',
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
                    <div className="app-bar">
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
                        <div>
                            {/* {mode} mode */}
                            <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                            </IconButton>
                        </div>
                        {/* <div>
                            <IconButton color="inherit">
                                <IosShareIcon />
                            </IconButton>
                        </div> */}
                        <div>
                            <Fragment>
                                {/* <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}> */}
                                    <IconButton
                                        color="inherit"
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                {/* </Box> */}
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
                                        pt: 0.75,
                                        pb: 0.75,
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
                                    
                                    {/* <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <Brightness4Icon fontSize="small" />
                                        </ListItemIcon>
                                        Dark Mode
                                    </MenuItem> */}
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
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
  }
  
  export default AppBar;