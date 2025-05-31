import React from 'react';
import { Typography, Box } from '@mui/material';

const PremierLeague: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Premier League
      </Typography>
      <Typography variant="body1">
        Premier League statistics and betting information will be displayed here.
      </Typography>
    </Box>
  );
};

export default PremierLeague; 