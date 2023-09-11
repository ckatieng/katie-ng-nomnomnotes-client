import { useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

const labels = {
    "": "",
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

// Function to get the label text based on the rating value
function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

/*
 * HoverRating Component
 * - Provides a star rating system that allows users to select their rating
 *
 * Props:
 * 'handleRatingChange' prop: a function to handle changes in the rating
 */

function HoverRating({ handleRatingChange }) {
    const [value, setValue] = useState(null);
    const [hover, setHover] = useState(-1);

    return(
        <Box
            sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
        }}
        >
            <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                    if (newValue === 0) {
                        // Reset to null if 0 is selected
                        setValue(null); 
                    } else {
                        setValue(newValue);
                    }
                    handleRatingChange(newValue === 0 ? null : newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon 
                    style={{ 
                        opacity: 0.55,
                        fontSize: 40, // Adjust star size
                        
                    }} 
                />
                }
                icon={
                    <StarIcon
                      style={{
                        fontSize: 40, // Adjust star size
                        color: "#ad86ea", // Set the hover star color
                      }}
                    />
                }
            />
            {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
        </Box>
    );
}

export default HoverRating;