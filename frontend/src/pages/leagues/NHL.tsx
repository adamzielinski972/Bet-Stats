import React from 'react';
import { Typography, Box } from '@mui/material';

const NHL: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        NHL
      </Typography>
      <Typography variant="body1">
        NHL statistics and betting information will be displayed here.
      </Typography>
    </Box>
  );
};

export default NHL; 