import React from 'react';
import SportPage from '../../components/SportPage';

// Mock data for MLB games
const mlbGames = [
  {
    id: 1,
    homeTeam: 'New York Yankees',
    awayTeam: 'Boston Red Sox',
    time: '2024-03-31 13:05',
    odds: {
      home: '-130',
      away: '+110'
    },
    featured: true,
    prediction: 'Yankees Run Line -1.5',
    confidence: 'High' as const
  },
  {
    id: 2,
    homeTeam: 'Los Angeles Dodgers',
    awayTeam: 'San Francisco Giants',
    time: '2024-03-31 16:10',
    odds: {
      home: '-150',
      away: '+130'
    },
    featured: true,
    prediction: 'Under 8.5 Runs',
    confidence: 'Medium' as const
  },
  {
    id: 3,
    homeTeam: 'Houston Astros',
    awayTeam: 'Texas Rangers',
    time: '2024-04-01 14:10',
    odds: {
      home: '-120',
      away: '+100'
    }
  },
  {
    id: 4,
    homeTeam: 'Chicago Cubs',
    awayTeam: 'St. Louis Cardinals',
    time: '2024-04-01 19:40',
    odds: {
      home: '+110',
      away: '-130'
    }
  }
];

const MLB: React.FC = () => {
  return (
    <SportPage
      sport="baseball"
      league="MLB"
      games={mlbGames}
    />
  );
};

export default MLB; 