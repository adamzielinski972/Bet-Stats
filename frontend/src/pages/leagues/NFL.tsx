import React from 'react';
import SportPage from '../../components/SportPage';

// Mock data for NFL games
const nflGames = [
  {
    id: 1,
    homeTeam: 'Kansas City Chiefs',
    awayTeam: 'Buffalo Bills',
    time: '2024-03-31 16:25',
    odds: {
      home: '-120',
      away: '+100'
    },
    featured: true,
    prediction: 'Chiefs -2.5',
    confidence: 'High' as const
  },
  {
    id: 2,
    homeTeam: 'San Francisco 49ers',
    awayTeam: 'Philadelphia Eagles',
    time: '2024-03-31 20:20',
    odds: {
      home: '-130',
      away: '+110'
    },
    featured: true,
    prediction: 'Over 48.5 Points',
    confidence: 'Medium' as const
  },
  {
    id: 3,
    homeTeam: 'Green Bay Packers',
    awayTeam: 'Detroit Lions',
    time: '2024-04-01 13:00',
    odds: {
      home: '+110',
      away: '-130'
    }
  },
  {
    id: 4,
    homeTeam: 'Dallas Cowboys',
    awayTeam: 'New York Giants',
    time: '2024-04-01 16:25',
    odds: {
      home: '-140',
      away: '+120'
    }
  }
];

const NFL: React.FC = () => {
  return (
    <SportPage
      sport="football"
      league="NFL"
      games={nflGames}
    />
  );
};

export default NFL; 