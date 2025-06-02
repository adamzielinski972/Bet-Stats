import React from 'react';
import SportPage from '../../components/SportPage';

// Mock data for NBA games
const nbaGames = [
  {
    id: 1,
    homeTeam: 'Boston Celtics',
    awayTeam: 'Los Angeles Lakers',
    time: '2024-03-31 19:00',
    odds: {
      home: '-110',
      away: '-110'
    },
    featured: true,
    prediction: 'Over 220.5 Points',
    confidence: 'High' as const
  },
  {
    id: 2,
    homeTeam: 'Golden State Warriors',
    awayTeam: 'Phoenix Suns',
    time: '2024-03-31 22:30',
    odds: {
      home: '-120',
      away: '+100'
    },
    featured: true,
    prediction: 'Warriors -3.5',
    confidence: 'Medium' as const
  },
  {
    id: 3,
    homeTeam: 'Milwaukee Bucks',
    awayTeam: 'Philadelphia 76ers',
    time: '2024-04-01 19:30',
    odds: {
      home: '-130',
      away: '+110'
    }
  },
  {
    id: 4,
    homeTeam: 'Denver Nuggets',
    awayTeam: 'Dallas Mavericks',
    time: '2024-04-01 21:00',
    odds: {
      home: '-140',
      away: '+120'
    }
  }
];

const NBA: React.FC = () => {
  return (
    <SportPage
      sport="basketball"
      league="NBA"
      games={nbaGames}
    />
  );
};

export default NBA; 