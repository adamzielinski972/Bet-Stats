import React from 'react';
import { Box, Button, useTheme, useMediaQuery } from '@mui/material';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
      }}
    >
      <Box
        sx={{
          backgroundColor: 'background.paper',
          borderRadius: 1,
          boxShadow: 1,
          mb: 2,
          width: '55%',
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            height: '6px',
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
        <Box
          sx={{
            display: 'flex',
            minWidth: 'fit-content',
            p: 1,
            gap: 1,
          }}
        >
          {sports.map((sport) => (
            <Button
              key={sport.name}
              onClick={() => navigate(sport.path)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px 12px',
                color: 'text.primary',
                backgroundColor: 'background.paper',
                width: {
                  xs: '60px',
                  sm: sport.name === 'Premier League' ? '160px' : '90px',
                  md: sport.name === 'Premier League' ? '160px' : '110px',
                },
                minWidth: {
                  xs: '60px',
                  sm: sport.name === 'Premier League' ? '160px' : '90px',
                  md: sport.name === 'Premier League' ? '160px' : '110px',
                },
                height: '36px',
                flexShrink: 0,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <Box
                component="span"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  mr: isMobile ? 0 : 1.5,
                  '& > svg': {
                    fontSize: '1.25rem',
                    flexShrink: 0,
                  },
                }}
              >
                {sport.icon}
              </Box>
              {!isMobile && (
                <Box
                  component="span"
                  sx={{
                    fontSize: '0.85rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    flexShrink: 0,
                    textAlign: 'center',
                  }}
                >
                  {sport.name}
                </Box>
              )}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SportsNavBar; 