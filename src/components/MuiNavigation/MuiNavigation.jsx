import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
// import Paper from '@mui/material/Paper';
import RamenIcon from '@mui/icons-material/RamenDiningSharp';
import FavoriteIcon from '@mui/icons-material/FavoriteSharp';
import HistoryIcon from '@mui/icons-material/History';
import PlaceIcon from '@mui/icons-material/PlaceSharp';

function MuiNavigation() {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();

    return (
        // <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
            sx={{ 
                position: 'fixed', 
                bottom: 0, 
                left: 0, 
                right: 0,
                '& .MuiBottomNavigationAction-label': {
                    fontWeight: '600',
                    fontSize: '11px',
                },
                '& .MuiBottomNavigationAction-label.Mui-selected': {
                    fontSize: '11px',
                },
            }}
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);

                // Use the navigate function to change the route
                switch (newValue) {
                    case 0:
                        navigate('/musttry');
                        break;
                    case 1:
                        navigate('/favourites');
                        break;
                    case 2:
                        navigate('/visited');
                        break;
                    case 3:
                        navigate('/nearby');
                        break;
                    default:
                        break;
                }
            }}
        >
            <BottomNavigationAction label="Must-Try" icon={<RamenIcon />} />
            <BottomNavigationAction label="Favourites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Visited" icon={<HistoryIcon />} />
            <BottomNavigationAction label="Nearby" icon={<PlaceIcon />} />
        </BottomNavigation>
        // </Paper>
    );
}

export default MuiNavigation;