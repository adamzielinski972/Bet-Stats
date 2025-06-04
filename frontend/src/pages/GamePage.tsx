import React, { useState, useEffect } from 'react';
import { useLocation, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  Chip,
  Avatar,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  SportsSoccer,
  SportsBasketball,
  SportsBaseball,
  SportsFootball,
  SportsHockey,
  TrendingUp,
  Timeline,
  Person,
  Groups,
  Assessment,
  ArrowBack
} from '@mui/icons-material';
import { Game, Bookmaker, Market } from '../types/api';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`game-tabpanel-${index}`}
      aria-labelledby={`game-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface GameProp {
  name: string;
  odds: string;
  type: string;
}

interface PlayerProp {
  player: string;
  stat: string;
  line: number;
  overOdds: string;
  underOdds: string;
}

interface GamePageProps {
  sport: 'soccer' | 'basketball' | 'baseball' | 'football' | 'hockey';
  league: string;
  homeTeam: string;
  awayTeam: string;
  time: string;
  odds: {
    home: string;
    away: string;
    draw?: string;
  };
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

// Mock data for props
const mockGameProps: GameProp[] = [
  { name: 'Total Points', odds: 'Over 220.5 (-110) / Under 220.5 (-110)', type: 'total' },
  { name: 'Spread', odds: 'Home -5.5 (-110) / Away +5.5 (-110)', type: 'spread' },
  { name: 'First Quarter Winner', odds: 'Home (-120) / Away (+100)', type: 'period' },
  { name: 'First Half Total', odds: 'Over 110.5 (-110) / Under 110.5 (-110)', type: 'period' },
];

const mockPlayerProps: PlayerProp[] = [
  { player: 'LeBron James', stat: 'Points', line: 25.5, overOdds: '-110', underOdds: '-110' },
  { player: 'Stephen Curry', stat: 'Three Pointers Made', line: 4.5, overOdds: '-115', underOdds: '-105' },
  { player: 'Nikola Jokic', stat: 'Rebounds', line: 11.5, overOdds: '-120', underOdds: '+100' },
  { player: 'Ja Morant', stat: 'Assists', line: 8.5, overOdds: '+105', underOdds: '-125' },
];

const mockTeamProps: GameProp[] = [
  { name: 'Team Total Points - Home', odds: 'Over 112.5 (-110) / Under 112.5 (-110)', type: 'team' },
  { name: 'Team Total Points - Away', odds: 'Over 108.5 (-110) / Under 108.5 (-110)', type: 'team' },
  { name: 'First to 20 Points', odds: 'Home (-115) / Away (-105)', type: 'team' },
  { name: 'Race to 30 Points', odds: 'Home (-110) / Away (-110)', type: 'team' },
];

const formatOdds = (price: number): string => {
  return price >= 0 ? `+${price}` : price.toString();
};

const GamePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sport, id } = useParams<{ sport: string; id: string }>();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:3621/api/odds/${sport}`);
        if (!response.ok) {
          throw new Error('Failed to fetch game data');
        }
        const games = await response.json();
        const foundGame = games.find((g: Game) => g.id === id);
        if (!foundGame) {
          throw new Error('Game not found');
        }
        setGame(foundGame);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (sport && id) {
      fetchGameData();
    }
  }, [sport, id]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getLeaguePath = (sport: string) => {
    switch (sport) {
      case 'baseball_mlb':
        return '/mlb';
      case 'basketball_nba':
        return '/nba';
      case 'soccer_epl':
        return '/premier-league';
      case 'football_nfl':
        return '/nfl';
      case 'hockey_nhl':
        return '/nhl';
      default:
        return '/';
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!game) {
    return <Navigate to="/" replace />;
  }

  const mainBookmaker = game.bookmakers[0]; // Using first bookmaker for main odds
  const h2hMarket = mainBookmaker?.markets.find(m => m.key === 'h2h');
  const homeOdds = h2hMarket?.outcomes.find(o => o.name === game.homeTeam)?.price;
  const awayOdds = h2hMarket?.outcomes.find(o => o.name === game.awayTeam)?.price;

  return (
    <Container maxWidth="xl">
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Tooltip title={`Back to ${game.sportTitle}`}>
            <IconButton
              onClick={() => navigate(getLeaguePath(game.sportKey))}
              sx={{ flexShrink: 0 }}
            >
              <ArrowBack />
            </IconButton>
          </Tooltip>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {getSportIcon(sport || '')}
          </Avatar>
          <Typography variant="h5" component="h1">
            {game.homeTeam} vs {game.awayTeam}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="subtitle1" color="text.secondary">
            {game.sportTitle}
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="subtitle1" color="text.secondary">
            {new Date(game.commenceTime).toLocaleString()}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Chip 
            label={`${game.homeTeam} ${homeOdds ? formatOdds(homeOdds) : 'N/A'}`} 
            color="primary" 
            variant="outlined" 
          />
          <Chip 
            label={`${game.awayTeam} ${awayOdds ? formatOdds(awayOdds) : 'N/A'}`} 
            color="primary" 
            variant="outlined" 
          />
        </Box>

        {/* Bookmakers Section */}
        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          All Bookmakers
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bookmaker</TableCell>
                <TableCell>{game.homeTeam}</TableCell>
                <TableCell>{game.awayTeam}</TableCell>
                <TableCell>Last Updated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {game.bookmakers.map((bookmaker) => {
                const market = bookmaker.markets.find(m => m.key === 'h2h');
                const homeOdds = market?.outcomes.find(o => o.name === game.homeTeam)?.price;
                const awayOdds = market?.outcomes.find(o => o.name === game.awayTeam)?.price;

                return (
                  <TableRow key={bookmaker.key}>
                    <TableCell>{bookmaker.title}</TableCell>
                    <TableCell>{homeOdds ? formatOdds(homeOdds) : 'N/A'}</TableCell>
                    <TableCell>{awayOdds ? formatOdds(awayOdds) : 'N/A'}</TableCell>
                    <TableCell>
                      {new Date(bookmaker.lastUpdate).toLocaleString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default GamePage; 