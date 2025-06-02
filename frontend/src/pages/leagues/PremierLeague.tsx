import React from 'react';
import SportPage from '../../components/SportPage';

// Mock data for Premier League games
const premierLeagueGames = [
  {
    id: 1,
    homeTeam: 'Manchester City',
    awayTeam: 'Arsenal',
    time: '2024-03-31 15:30',
    odds: {
      home: '+130',
      away: '+210',
      draw: '+240'
    },
    featured: true,
    prediction: 'Manchester City to Win',
    confidence: 'High' as const
  },
  {
    id: 2,
    homeTeam: 'Liverpool',
    awayTeam: 'Manchester United',
    time: '2024-03-31 17:30',
    odds: {
      home: '-110',
      away: '+280',
      draw: '+260'
    },
    featured: true,
    prediction: 'Over 2.5 Goals',
    confidence: 'Medium' as const
  },
  {
    id: 3,
    homeTeam: 'Chelsea',
    awayTeam: 'Tottenham',
    time: '2024-04-01 15:00',
    odds: {
      home: '+150',
      away: '+180',
      draw: '+230'
    }
  },
  {
    id: 4,
    homeTeam: 'Newcastle',
    awayTeam: 'Aston Villa',
    time: '2024-04-01 17:30',
    odds: {
      home: '+120',
      away: '+220',
      draw: '+250'
    }
  }
];

const PremierLeague: React.FC = () => {
  return (
    <SportPage
      sport="soccer"
      league="Premier League"
      games={premierLeagueGames}
    />
  );
};

export default PremierLeague; 