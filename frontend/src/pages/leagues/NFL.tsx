import React from 'react';
import { Typography, Box } from '@mui/material';

const NFL: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        NFL
      </Typography>
      <Typography variant="body1">
        NFL statistics and betting information will be displayed here.
      </Typography>
    </Box>
  );
};

export default NFL; 