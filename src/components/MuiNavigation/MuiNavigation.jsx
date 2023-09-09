import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import RamenIcon from '@mui/icons-material/RamenDiningSharp';
import FavoriteIcon from '@mui/icons-material/FavoriteSharp';
import StarIcon from '@mui/icons-material/Star';
import HistoryIcon from '@mui/icons-material/History';
// import PlaceIcon from '@mui/icons-material/PlaceSharp';

function MuiNavigation({ mode }) {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();

    return (
        <BottomNavigation
            sx={{ 
                position: 'fixed', 
                bottom: 0, 
                left: 0, 
                right: 0,
                backgroundColor: mode === 'dark' ? '#121212' : '#eaecef',
                // backgroundColor: 'rgb(243, 246, 252)',
                // height: '70px',
                // p: '20px 0',
                // navigation labels
                '& .MuiBottomNavigationAction-label': {
                    fontWeight: '600',
                    fontSize: '11px',
                    color: mode === 'dark' ? '#74787a' : '#818589', 
                },
                // selected navigation label
                '& .MuiBottomNavigationAction-label.Mui-selected': {
                    fontSize: '11px',
                    color: '#a275f9',
                },
                // navigation icons
                '& .MuiSvgIcon-root': {
                    color: mode === 'dark' ? '#989c9e' : '#818589',   
                },
                // selected navigation icon
                '& .MuiBottomNavigationAction-root.Mui-selected .MuiSvgIcon-root': {
                    color: mode === 'dark' ? '#b292ff' : '#a275f9',
                },
                // selection effect
                '& .MuiBottomNavigationAction-root.Mui-selected': {
                    color: mode === 'dark' ? '#b292ff' : '#a275f9',
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
                    // case 4:
                    //     navigate('/nearby');
                    //     break;
                    default:
                        break;
                }
            }}
        >
            <BottomNavigationAction label="Must-Try" icon={<RamenIcon />} />
            <BottomNavigationAction label="Favourites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Top 10" icon={<StarIcon />} />
            <BottomNavigationAction label="Visited" icon={<HistoryIcon />} />
            {/* <BottomNavigationAction label="Nearby" icon={<PlaceIcon />} /> */}
        </BottomNavigation>
    );
}

export default MuiNavigation;