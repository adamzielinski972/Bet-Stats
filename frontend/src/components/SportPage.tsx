import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Avatar,
  Divider,
  Container,
  Paper
} from '@mui/material';
import {
  SportsSoccer,
  SportsBasketball,
  SportsBaseball,
  SportsFootball,
  SportsHockey,
  TrendingUp
} from '@mui/icons-material';

interface Game {
  id: number;
  homeTeam: string;
  awayTeam: string;
  time: string;
  odds: {
    home: string;
    away: string;
    draw?: string;
  };
  featured?: boolean;
  prediction?: string;
  confidence?: 'High' | 'Medium' | 'Low';
}

interface SportPageProps {
  sport: 'soccer' | 'basketball' | 'baseball' | 'football' | 'hockey';
  league: string;
  games: Game[];
}

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

const SportPage: React.FC<SportPageProps> = ({ sport, league, games }) => {
  const featuredGames = games.filter(game => game.featured);
  const regularGames = games.filter(game => !game.featured);

  return (
    <Container maxWidth="xl">
      {/* Featured Games Section */}
      {featuredGames.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
            Featured {league} Bets
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3
            }}
          >
            {featuredGames.map((game) => (
              <Box
                key={game.id}
                sx={{
                  width: {
                    xs: '100%',
                    sm: 'calc(50% - 12px)',
                    md: 'calc(33.333% - 16px)'
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
                        {getSportIcon(sport)}
                      </Avatar>
                    }
                    title={`${game.homeTeam} vs ${game.awayTeam}`}
                    subheader={league}
                    action={
                      game.prediction && (
                        <Chip
                          label={game.odds.home}
                          color="primary"
                          size="small"
                          sx={{ fontWeight: 'bold' }}
                        />
                      )
                    }
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    {game.prediction && (
                      <>
                        <Typography variant="body1" sx={{ mt: 1, fontWeight: 500 }}>
                          {game.prediction}
                        </Typography>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Chip
                            label={`Confidence: ${game.confidence}`}
                            size="small"
                            color={getConfidenceColor(game.confidence || '') as any}
                            sx={{ fontWeight: 500 }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {new Date(game.time).toLocaleString()}
                          </Typography>
                        </Box>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* All Games Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
          All {league} Games
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {regularGames.map((game) => (
            <Box 
              key={game.id} 
              sx={{ 
                width: {
                  xs: '100%',
                  sm: 'calc(50% - 12px)',
                  md: 'calc(33.333% - 16px)'
                }
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: (theme) => `0 4px 8px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)'}`,
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {new Date(game.time).toLocaleString()}
                  </Typography>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    {getSportIcon(sport)}
                  </Avatar>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ textAlign: 'center', mb: 1 }}>
                    {game.homeTeam} vs {game.awayTeam}
                  </Typography>
                  <Divider />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 2 }}>
                  <Chip
                    label={`Home ${game.odds.home}`}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                  {sport === 'soccer' && game.odds.draw && (
                    <Chip
                      label={`Draw ${game.odds.draw}`}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  )}
                  <Chip
                    label={`Away ${game.odds.away}`}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                </Box>
              </Paper>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default SportPage; 