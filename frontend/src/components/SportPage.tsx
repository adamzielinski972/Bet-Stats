import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  Paper,
  CircularProgress
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
  id: string;
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
  sport: string;
  league: string;
  games: Game[];
  loading?: boolean;
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

const SportPage: React.FC<SportPageProps> = ({ sport, league, games, loading = false }) => {
  const navigate = useNavigate();
  const featuredGames = games.filter(game => game.featured);
  const regularGames = games.filter(game => !game.featured);

  const handleGameClick = (game: Game) => {
    navigate(`/game/${sport}/${game.id}`);
  };

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

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
                  },
                  cursor: 'pointer'
                }}
                onClick={() => handleGameClick(game)}
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
                width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)' },
                cursor: 'pointer'
              }}
              onClick={() => handleGameClick(game)}
            >
              <Paper 
                sx={{ 
                  p: 2,
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => `0 6px 12px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)'}`,
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {getSportIcon(sport)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {game.homeTeam} vs {game.awayTeam}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(game.time).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip 
                    label={`Home ${game.odds.home}`} 
                    size="small" 
                    color="primary" 
                    variant="outlined" 
                  />
                  {game.odds.draw && (
                    <Chip 
                      label={`Draw ${game.odds.draw}`} 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                    />
                  )}
                  <Chip 
                    label={`Away ${game.odds.away}`} 
                    size="small" 
                    color="primary" 
                    variant="outlined" 
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