import React from 'react';
import SportPage from '../../components/SportPage';

// Mock data for NHL games
const nhlGames = [
  {
    id: 1,
    homeTeam: 'Boston Bruins',
    awayTeam: 'Toronto Maple Leafs',
    time: '2024-03-31 19:00',
    odds: {
      home: '-115',
      away: '-105'
    },
    featured: true,
    prediction: 'Over 6.5 Goals',
    confidence: 'High' as const
  },
  {
    id: 2,
    homeTeam: 'Colorado Avalanche',
    awayTeam: 'Vegas Golden Knights',
    time: '2024-03-31 22:00',
    odds: {
      home: '-130',
      away: '+110'
    },
    featured: true,
    prediction: 'Avalanche ML',
    confidence: 'Medium' as const
  },
  {
    id: 3,
    homeTeam: 'New York Rangers',
    awayTeam: 'Pittsburgh Penguins',
    time: '2024-04-01 19:00',
    odds: {
      home: '-125',
      away: '+105'
    }
  },
  {
    id: 4,
    homeTeam: 'Edmonton Oilers',
    awayTeam: 'Calgary Flames',
    time: '2024-04-01 21:00',
    odds: {
      home: '-120',
      away: '+100'
    }
  }
];

const NHL: React.FC = () => {
  return (
    <SportPage
      sport="hockey"
      league="NHL"
      games={nhlGames}
    />
  );
};

export default NHL; 