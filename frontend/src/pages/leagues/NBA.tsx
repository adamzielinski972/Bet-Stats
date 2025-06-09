import React, { useEffect, useState } from 'react';
import SportPage from '../../components/SportPage';
import { Game as APIGame } from '../../types/api';
import { getOdds, getLastUpdate } from '../../services/oddsService';
import { Typography, Box } from '@mui/material';

interface SportPageGame {
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

const NBA: React.FC = () => {
  const [games, setGames] = useState<SportPageGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const gamesData = await getOdds('basketball_nba');
        const lastUpdateTime = await getLastUpdate('basketball_nba');
        setLastUpdate(lastUpdateTime);

        const transformedGames: SportPageGame[] = gamesData.map((game: APIGame) => ({
          id: game.id,
          homeTeam: game.homeTeam,
          awayTeam: game.awayTeam,
          time: game.commenceTime,
          odds: {
            home: game.bookmakers?.[0]?.markets?.[0]?.outcomes?.find(o => o.name === game.homeTeam)?.price.toString() || 'N/A',
            away: game.bookmakers?.[0]?.markets?.[0]?.outcomes?.find(o => o.name === game.awayTeam)?.price.toString() || 'N/A'
          },
          featured: Math.random() < 0.3 // Randomly feature some games
        }));

        setGames(transformedGames);
      } catch (error) {
        console.error('Error fetching NBA games:', error);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <>
      {lastUpdate && (
        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Typography variant="caption" color="text.secondary">
            Last updated: {lastUpdate.toLocaleString()}
          </Typography>
        </Box>
      )}
      <SportPage
        sport="basketball"
        league="NBA"
        games={games}
        loading={loading}
      />
    </>
  );
};

export default NBA; 