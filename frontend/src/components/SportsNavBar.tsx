import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  SportsSoccer as SoccerIcon,
  SportsBasketball as BasketballIcon,
  SportsBaseball as BaseballIcon,
  SportsFootball as FootballIcon,
  SportsHockey as HockeyIcon,
} from '@mui/icons-material';

const sports = [
  { name: 'Premier League', icon: <SoccerIcon />, path: '/premier-league' },
  { name: 'NBA', icon: <BasketballIcon />, path: '/nba' },
  { name: 'MLB', icon: <BaseballIcon />, path: '/mlb' },
  { name: 'NFL', icon: <FootballIcon />, path: '/nfl' },
  { name: 'NHL', icon: <HockeyIcon />, path: '/nhl' },
];

const SportsNavBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
        py: 2,
        px: 3,
        backgroundColor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1,
        mb: 4,
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          height: '8px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'background.default',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'primary.main',
          borderRadius: '4px',
        },
      }}
    >
      {sports.map((sport) => (
        <Button
          key={sport.name}
          startIcon={sport.icon}
          onClick={() => navigate(sport.path)}
          sx={{
            color: 'text.primary',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
            whiteSpace: 'nowrap',
          }}
        >
          {sport.name}
        </Button>
      ))}
    </Box>
  );
};

export default SportsNavBar; 