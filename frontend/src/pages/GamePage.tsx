import React, { useState } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
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
  Tooltip
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

const GamePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  // Get props from route state
  const state = location.state as GamePageProps;
  
  // If no state is provided, redirect to home
  if (!state) {
    return <Navigate to="/" replace />;
  }

  const { sport, league, homeTeam, awayTeam, time, odds } = state;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getLeaguePath = (sport: string) => {
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
    <Container maxWidth="xl">
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Tooltip title={`Back to ${league}`}>
            <IconButton
              onClick={() => navigate(getLeaguePath(sport))}
              sx={{ flexShrink: 0 }}
            >
              <ArrowBack />
            </IconButton>
          </Tooltip>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {getSportIcon(sport)}
          </Avatar>
          <Typography variant="h5" component="h1">
            {homeTeam} vs {awayTeam}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="subtitle1" color="text.secondary">
            {league}
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="subtitle1" color="text.secondary">
            {new Date(time).toLocaleString()}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Chip label={`Home ${odds.home}`} color="primary" variant="outlined" />
          {odds.draw && (
            <Chip label={`Draw ${odds.draw}`} color="primary" variant="outlined" />
          )}
          <Chip label={`Away ${odds.away}`} color="primary" variant="outlined" />
        </Box>
      </Paper>

      <Paper sx={{ width: '100%', mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="game props tabs"
        >
          <Tab icon={<Assessment />} label="Game Props" />
          <Tab icon={<Person />} label="Player Props" />
          <Tab icon={<Groups />} label="Team Props" />
          <Tab icon={<Timeline />} label="Live Betting" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Prop</TableCell>
                  <TableCell>Odds</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockGameProps.map((prop, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{prop.name}</TableCell>
                    <TableCell>{prop.odds}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Player</TableCell>
                  <TableCell>Stat</TableCell>
                  <TableCell>Line</TableCell>
                  <TableCell>Over</TableCell>
                  <TableCell>Under</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockPlayerProps.map((prop, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{prop.player}</TableCell>
                    <TableCell>{prop.stat}</TableCell>
                    <TableCell>{prop.line}</TableCell>
                    <TableCell>{prop.overOdds}</TableCell>
                    <TableCell>{prop.underOdds}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Prop</TableCell>
                  <TableCell>Odds</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockTeamProps.map((prop, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{prop.name}</TableCell>
                    <TableCell>{prop.odds}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              Live betting will be available when the game starts
            </Typography>
          </Box>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default GamePage; 