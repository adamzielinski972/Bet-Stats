import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ 
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      p: 2
    }}>
      <Paper sx={{ 
        width: '100%',
        p: 4, 
        textAlign: 'center'
      }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Bet Stats
        </Typography>
        <Typography variant="body1">
          Track and analyze your betting statistics with our powerful tools.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Home; 