import React from 'react';
import { Typography, Box } from '@mui/material';
import SportsNavBar from '../components/SportsNavBar';

const Home: React.FC = () => {
  return (
    <Box>
      <Box sx={{ width: '30%', maxWidth: '1200px', mx: 'auto' }}>
        <SportsNavBar />
      </Box>
      
      <Typography variant="h4" gutterBottom align="center">
        Welcome to Bet Stats
      </Typography>
      <Typography variant="body1" align="center">
        Your one-stop destination for sports betting statistics and analysis.
      </Typography>
    </Box>
  );
};

export default Home; 