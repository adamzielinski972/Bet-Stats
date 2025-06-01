import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Container
} from '@mui/material';
import { 
  SportsSoccer,
  SportsBasketball,
  SportsBaseball,
  SportsFootball,
  SportsHockey,
  TrendingUp
} from '@mui/icons-material';

// Mock data for featured bets
const featuredBets = [
  {
    id: 1,
    league: 'Premier League',
    sport: 'soccer',
    title: 'Manchester City vs Arsenal',
    description: 'Premier League Title Race',
    odds: '+150',
    prediction: 'Manchester City to Win',
    confidence: 'High',
    time: '2024-03-31 15:30',
  },
  {
    id: 2,
    league: 'NBA',
    sport: 'basketball',
    title: 'Celtics vs Lakers',
    description: 'NBA Regular Season',
    odds: '-110',
    prediction: 'Over 220.5 Points',
    confidence: 'Medium',
    time: '2024-03-31 19:00',
  },
  {
    id: 3,
    league: 'MLB',
    sport: 'baseball',
    title: 'Yankees vs Red Sox',
    description: 'AL East Rivalry',
    odds: '+125',
    prediction: 'Yankees Run Line -1.5',
    confidence: 'High',
    time: '2024-03-31 13:05',
  }
];

const getSportIcon = (sport: string) => {
  switch (sport) {
    case 'soccer':
      return <SportsSoccer />;
    case 'basketball':
      return <SportsBasketball />;
    case 'baseball':
      return <SportsBaseball />;
    case 'football':
      return <SportsFootball />;
    case 'hockey':
      return <SportsHockey />;
    default:
      return <TrendingUp />;
  }
};

const getConfidenceColor = (confidence: string) => {
  switch (confidence.toLowerCase()) {
    case 'high':
      return 'success';
    case 'medium':
      return 'warning';
    case 'low':
      return 'error';
    default:
      return 'default';
  }
};

const FeaturedBets: React.FC = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
        Featured Bets
      </Typography>
      <Box 
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center'
        }}
      >
        {featuredBets.map((bet) => (
          <Box 
            key={bet.id}
            sx={{ 
              width: {
                xs: '100%',
                sm: '350px',
                md: '380px'
              }
            }}
          >
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => `0 6px 12px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)'}`,
                }
              }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {getSportIcon(bet.sport)}
                  </Avatar>
                }
                title={bet.title}
                subheader={bet.league}
                action={
                  <Tooltip title="Odds">
                    <Chip
                      label={bet.odds}
                      color="primary"
                      size="small"
                      sx={{ fontWeight: 'bold' }}
                    />
                  </Tooltip>
                }
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {bet.description}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, fontWeight: 500 }}>
                  {bet.prediction}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip
                    label={`Confidence: ${bet.confidence}`}
                    size="small"
                    color={getConfidenceColor(bet.confidence) as any}
                    sx={{ fontWeight: 500 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {new Date(bet.time).toLocaleString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FeaturedBets; 