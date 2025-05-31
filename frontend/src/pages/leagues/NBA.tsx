import React from 'react';
import { Typography, Box } from '@mui/material';

const NBA: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        NBA
      </Typography>
      <Typography variant="body1">
        NBA statistics and betting information will be displayed here.
      </Typography>
    </Box>
  );
};

export default NBA; 