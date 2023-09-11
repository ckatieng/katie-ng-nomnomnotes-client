import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

/*
 * LoadingSpinner Component
 * - Displays a circular loading spinner centered on the screen
 */

function LoadingSpinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <CircularProgress style={{ color: '#d5cce2' }}/> 
    </div>
  );
}

export default LoadingSpinner;