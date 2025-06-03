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

interface BaseGame {
  id: number;
  league: string;
  homeTeam: string;
  awayTeam: string;
  time: string;
  venue: string;
  competition: string;
}

interface SoccerGame extends BaseGame {
  round: string;
  homeForm: string;
  awayForm: string;
}

interface TeamRecordGame extends BaseGame {
  homeRecord: string;
  awayRecord: string;
}

type Game = SoccerGame | TeamRecordGame;

// Mock data for featured games
const featuredGames: Record<string, Game[]> = {
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

  const handleGameClick = (sport: string, game: Game) => {
    navigate(`/game/${sport}/${game.id}`, {
      state: {
        sport,
        league: game.league,
        homeTeam: game.homeTeam,
        awayTeam: game.awayTeam,
        time: game.time,
        odds: {
          home: '+100',  // Mock odds since they're not in the original data
          away: '-110',
          ...(sport === 'soccer' ? { draw: '+240' } : {})
        }
      }
    });
  };

  const isSoccerGame = (game: Game): game is SoccerGame => {
    return 'homeForm' in game && 'awayForm' in game;
  };

  const isTeamRecordGame = (game: Game): game is TeamRecordGame => {
    return 'homeRecord' in game && 'awayRecord' in game;
  };

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, textAlign: 'left' }}>
        Featured Games
      </Typography>
      {Object.entries(featuredGames).map(([sport, games]) => (
        <Box key={sport} sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {getSportIcon(sport)}
              {sport.charAt(0).toUpperCase() + sport.slice(1)}
            </Typography>
            <Button
              endIcon={<ChevronRight />}
              onClick={() => navigate(getSportRoute(sport))}
            >
              View All
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {games.map((game) => (
              <Card
                key={game.id}
                sx={{
                  width: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(33.333% - 11px)' },
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => `0 6px 12px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)'}`,
                  }
                }}
                onClick={() => handleGameClick(sport, game)}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {getSportIcon(sport)}
                    </Avatar>
                  }
                  title={`${game.homeTeam} vs ${game.awayTeam}`}
                  subheader={game.competition}
                />
                <CardContent>
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
                  {isTeamRecordGame(game) && (
                    <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                      <Chip
                        size="small"
                        label={`Home: ${game.homeRecord}`}
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        size="small"
                        label={`Away: ${game.awayRecord}`}
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                  )}
                  {isSoccerGame(game) && (
                    <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                      <Tooltip title="Last 5 games">
                        <Chip
                          size="small"
                          label={`Form: ${game.homeForm}`}
                          color="primary"
                          variant="outlined"
                        />
                      </Tooltip>
                      <Tooltip title="Last 5 games">
                        <Chip
                          size="small"
                          label={`Form: ${game.awayForm}`}
                          color="primary"
                          variant="outlined"
                        />
                      </Tooltip>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default FeaturedGames; 