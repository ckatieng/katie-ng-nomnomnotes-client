import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Location.scss";
import SelectLocation from "../SelectLocation/SelectLocation";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

/*
 * Location Component
 * - Provides a user interface for setting the location
 * - Includes a close button to navigate back to the previous page
 */

function Location() {
    const navigate = useNavigate();

    // Callback function to handle the close button click
    const handleCloseClick = useCallback(() => {
        // Use the navigate function to go back to the previous page
        navigate(-1);
    }, [navigate]);

    return(
        <div className="location">
            <IconButton
                    aria-label="close"
                    onClick={handleCloseClick}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
            >
                <CloseIcon />
            </IconButton>
            <h2 className="location__title">Set Location</h2>
            
            <div className="location__search">
                <SelectLocation />
            </div>
        </div>
    );
}

export default Location;