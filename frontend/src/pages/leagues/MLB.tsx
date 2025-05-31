import React from 'react';
import { Typography, Box } from '@mui/material';

const MLB: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        MLB
      </Typography>
      <Typography variant="body1">
        MLB statistics and betting information will be displayed here.
      </Typography>
    </Box>
  );
};

export default MLB; 