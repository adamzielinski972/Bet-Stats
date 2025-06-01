import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import SportsNavBar from '../components/SportsNavBar';
import FeaturedBets from '../components/FeaturedBets';
import FeaturedGames from '../components/FeaturedGames';

const Home: React.FC = () => {
  return (
    <Container maxWidth={false} disableGutters>
      <Container 
        maxWidth="xl" 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Box sx={{ 
          width: '100%',
          maxWidth: '1200px',
          mb: 4
        }}>
          <SportsNavBar />
        </Box>
        
        <Box sx={{ 
          width: '100%',
          maxWidth: '1400px',
          textAlign: 'center'
        }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Welcome to Bet Stats
          </Typography>
          <Typography variant="body1" sx={{ mb: 6 }}>
            Your one-stop destination for sports betting statistics and analysis.
          </Typography>
          
          <FeaturedBets />
          <FeaturedGames />
        </Box>
      </Container>
    </Container>
  );
};

export default Home; 