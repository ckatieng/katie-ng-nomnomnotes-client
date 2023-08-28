
import { useState, useMemo, createContext, useContext } from 'react';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { amber, deepOrange, grey } from '@mui/material/colors';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function ToggleColorMode({ children }) {
    const theme = useTheme();
    const [mode, setMode] = useState('light');
  
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),[]
    );
  
    const getDesignTokens = (mode) => ({
        palette: {
            mode,
            // ...(mode === 'light'
            //     ? {
            //         // palette values for light mode
            //         primary: amber,
            //         divider: amber[200],
            //         text: {
            //             primary: grey[900],
            //             secondary: grey[800],
            //         },
            //         }
            //     : {
            //         // palette values for dark mode
            //         primary: deepOrange,
            //         divider: deepOrange[700],
            //         background: {
            //             default: deepOrange[900],
            //             paper: deepOrange[900],
            //         },
            //         text: {
            //             primary: '#fff',
            //             secondary: grey[500],
            //         },
            //     }),
        },
        typography: {
            fontFamily: 'Montserrat, sans-serif',
        },
    });
  
    const updatedTheme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={updatedTheme}>
                <Box
                    sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.default',
                    color: 'text.primary',
                    borderRadius: 1,
                    p: 3,
                    }}
                >
                {mode} mode
                    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                    {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Box>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
  }
  
  export default ToggleColorMode;