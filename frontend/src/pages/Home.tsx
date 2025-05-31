import React from 'react';
import { Typography, Box } from '@mui/material';
import SportsNavBar from '../components/SportsNavBar';

const Home: React.FC = () => {
  return (
    <Box>
      <Box sx={{ 
        width: { 
          xs: '95%', // Mobile: almost full width
          sm: '80%', // Tablet: 80% width
          md: '70%', // Desktop: 70% width
          lg: '60%'  // Large screens: 60% width
        }, 
        maxWidth: '1200px', 
        mx: 'auto' 
      }}>
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