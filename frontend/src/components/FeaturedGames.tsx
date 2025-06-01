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
  Tooltip,
  Button
} from '@mui/material';
import {
  SportsSoccer,
  SportsBasketball,
  SportsBaseball,
  SportsFootball,
  SportsHockey,
  Schedule,
  LocationOn,
  ChevronRight
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Mock data for featured games
const featuredGames = {
  soccer: [
    {
      id: 1,
      league: 'Premier League',
      homeTeam: 'Manchester City',
      awayTeam: 'Arsenal',
      time: '2024-03-31 15:30',
      venue: 'Etihad Stadium',
      competition: 'Premier League',
      round: 'Matchweek 30',
      homeForm: 'WWWDW',
      awayForm: 'WWWLD'
    },
    {
      id: 2,
      league: 'Premier League',
      homeTeam: 'Liverpool',
      awayTeam: 'Manchester United',
      time: '2024-03-31 17:30',
      venue: 'Anfield',
      competition: 'Premier League',
      round: 'Matchweek 30',
      homeForm: 'WWWWL',
      awayForm: 'LDWWW'
    },
    {
      id: 3,
      league: 'Premier League',
      homeTeam: 'Chelsea',
      awayTeam: 'Tottenham',
      time: '2024-03-31 20:00',
      venue: 'Stamford Bridge',
      competition: 'Premier League',
      round: 'Matchweek 30',
      homeForm: 'DWWLD',
      awayForm: 'WDWLW'
    }
  ],
  basketball: [
    {
      id: 4,
      league: 'NBA',
      homeTeam: 'Boston Celtics',
      awayTeam: 'Los Angeles Lakers',
      time: '2024-03-31 19:00',
      venue: 'TD Garden',
      competition: 'Regular Season',
      homeRecord: '48-12',
      awayRecord: '34-26'
    },
    {
      id: 5,
      league: 'NBA',
      homeTeam: 'Golden State Warriors',
      awayTeam: 'Phoenix Suns',
      time: '2024-03-31 22:00',
      venue: 'Chase Center',
      competition: 'Regular Season',
      homeRecord: '42-18',
      awayRecord: '38-22'
    },
    {
      id: 6,
      league: 'NBA',
      homeTeam: 'Milwaukee Bucks',
      awayTeam: 'Denver Nuggets',
      time: '2024-03-31 20:30',
      venue: 'Fiserv Forum',
      competition: 'Regular Season',
      homeRecord: '45-15',
      awayRecord: '41-19'
    }
  ],
  baseball: [
    {
      id: 7,
      league: 'MLB',
      homeTeam: 'New York Yankees',
      awayTeam: 'Boston Red Sox',
      time: '2024-03-31 13:05',
      venue: 'Yankee Stadium',
      competition: 'AL East',
      homeRecord: '15-7',
      awayRecord: '12-10'
    },
    {
      id: 8,
      league: 'MLB',
      homeTeam: 'Los Angeles Dodgers',
      awayTeam: 'San Francisco Giants',
      time: '2024-03-31 16:10',
      venue: 'Dodger Stadium',
      competition: 'NL West',
      homeRecord: '16-6',
      awayRecord: '13-9'
    },
    {
      id: 9,
      league: 'MLB',
      homeTeam: 'Chicago Cubs',
      awayTeam: 'St. Louis Cardinals',
      time: '2024-03-31 14:20',
      venue: 'Wrigley Field',
      competition: 'NL Central',
      homeRecord: '14-8',
      awayRecord: '11-11'
    }
  ],
  football: [
    {
      id: 10,
      league: 'NFL',
      homeTeam: 'Kansas City Chiefs',
      awayTeam: 'Buffalo Bills',
      time: '2024-03-31 16:25',
      venue: 'Arrowhead Stadium',
      competition: 'AFC Divisional',
      homeRecord: '11-3',
      awayRecord: '10-4'
    },
    {
      id: 11,
      league: 'NFL',
      homeTeam: 'San Francisco 49ers',
      awayTeam: 'Philadelphia Eagles',
      time: '2024-03-31 20:20',
      venue: "Levi's Stadium",
      competition: 'NFC Championship',
      homeRecord: '12-2',
      awayRecord: '11-3'
    },
    {
      id: 12,
      league: 'NFL',
      homeTeam: 'Baltimore Ravens',
      awayTeam: 'Cincinnati Bengals',
      time: '2024-03-31 13:00',
      venue: 'M&T Bank Stadium',
      competition: 'AFC North',
      homeRecord: '10-4',
      awayRecord: '9-5'
    }
  ],
  hockey: [
    {
      id: 13,
      league: 'NHL',
      homeTeam: 'Toronto Maple Leafs',
      awayTeam: 'Montreal Canadiens',
      time: '2024-03-31 19:00',
      venue: 'Scotiabank Arena',
      competition: 'Atlantic Division',
      homeRecord: '35-17-8',
      awayRecord: '32-20-8'
    },
    {
      id: 14,
      league: 'NHL',
      homeTeam: 'Boston Bruins',
      awayTeam: 'New York Rangers',
      time: '2024-03-31 17:00',
      venue: 'TD Garden',
      competition: 'Eastern Conference',
      homeRecord: '37-15-8',
      awayRecord: '34-18-8'
    },
    {
      id: 15,
      league: 'NHL',
      homeTeam: 'Edmonton Oilers',
      awayTeam: 'Calgary Flames',
      time: '2024-03-31 22:00',
      venue: 'Rogers Place',
      competition: 'Battle of Alberta',
      homeRecord: '33-19-8',
      awayRecord: '31-21-8'
    }
  ]
};

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
      return <SportsSoccer />;
  }
};

const getFormattedDateTime = (dateTimeStr: string) => {
  const date = new Date(dateTimeStr);
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

const FeaturedGames: React.FC = () => {
  const navigate = useNavigate();

  const getSportRoute = (sport: string) => {
    switch (sport) {
      case 'soccer':
        return '/premier-league';
      case 'basketball':
        return '/nba';
      case 'baseball':
        return '/mlb';
      case 'football':
        return '/nfl';
      case 'hockey':
        return '/nhl';
      default:
        return '/';
    }
  };

  return (
    <Box sx={{ width: '100%', mt: 6 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
        Featured Games
      </Typography>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          maxWidth: '1200px',
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        {Object.entries(featuredGames).map(([sport, games]) => (
          <Box key={sport}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              mb: 3
            }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 500, 
                  textTransform: 'capitalize',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  pl: { xs: 0, sm: 0, md: 1 }
                }}
              >
                {getSportIcon(sport)}
                {sport} Games
              </Typography>
              <Button
                endIcon={<ChevronRight />}
                onClick={() => navigate(getSportRoute(sport))}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '1rem',
                  py: 0.75,
                  px: 1.5,
                  borderRadius: 1.5,
                  transition: 'all 0.2s ease-in-out',
                  '& .MuiButton-endIcon': {
                    ml: 0.5,
                    transition: 'transform 0.2s ease-in-out',
                    '& > svg': {
                      fontSize: '1.25rem'
                    }
                  },
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    transform: 'translateX(4px)',
                    '& .MuiButton-endIcon': {
                      transform: 'translateX(2px)'
                    }
                  }
                }}
              >
                More Games
              </Button>
            </Box>
            <Box 
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3,
                justifyContent: 'center'
              }}
            >
              {games.map((game) => (
                <Box 
                  key={game.id}
                  sx={{ 
                    width: {
                      xs: '100%',
                      sm: 'calc(50% - 16px)',
                      md: 'calc(33.333% - 16px)',
                      maxWidth: '360px'
                    },
                    minWidth: {
                      xs: '100%',
                      sm: '300px',
                      md: '300px'
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
                      title={game.competition}
                      subheader={game.league}
                    />
                    <CardContent>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" align="center" gutterBottom>
                          {game.homeTeam} vs {game.awayTeam}
                        </Typography>
                        <Divider sx={{ my: 1.5 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Schedule fontSize="small" />
                          <Typography variant="body2" color="text.secondary">
                            {getFormattedDateTime(game.time)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationOn fontSize="small" />
                          <Typography variant="body2" color="text.secondary">
                            {game.venue}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {'homeForm' in game ? (
                          <>
                            <Tooltip title="Last 5 games">
                              <Chip
                                label={`Form: ${game.homeForm}`}
                                size="small"
                                color="primary"
                                sx={{ fontWeight: 500 }}
                              />
                            </Tooltip>
                            <Tooltip title="Last 5 games">
                              <Chip
                                label={`Form: ${game.awayForm}`}
                                size="small"
                                color="primary"
                                sx={{ fontWeight: 500 }}
                              />
                            </Tooltip>
                          </>
                        ) : (
                          <>
                            <Tooltip title="Season Record">
                              <Chip
                                label={`Record: ${game.homeRecord}`}
                                size="small"
                                color="primary"
                                sx={{ fontWeight: 500 }}
                              />
                            </Tooltip>
                            <Tooltip title="Season Record">
                              <Chip
                                label={`Record: ${game.awayRecord}`}
                                size="small"
                                color="primary"
                                sx={{ fontWeight: 500 }}
                              />
                            </Tooltip>
                          </>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FeaturedGames; 