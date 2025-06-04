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

const MLB: React.FC = () => {
  const [games, setGames] = useState<SportPageGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching MLB games...');
        const [oddsData, updateTime] = await Promise.all([
          getOdds('baseball_mlb'),
          getLastUpdate('baseball_mlb')
        ]);
        
        setLastUpdate(updateTime);
        
        // Debug: Log the raw response
        console.log('Raw MLB games data:', JSON.stringify(oddsData, null, 2));
        
        if (!Array.isArray(oddsData) || oddsData.length === 0) {
          console.log('No games data received');
          setError('No games available');
          setGames([]);
          return;
        }

        // Debug: Log the first game's structure
        const firstGame = oddsData[0];
        console.log('First game structure:', {
          fields: Object.keys(firstGame),
          teams: {
            home: firstGame.homeTeam,
            away: firstGame.awayTeam
          },
          bookmakers: firstGame.bookmakers?.map(b => ({
            key: b.key,
            title: b.title,
            markets: b.markets?.map(m => m.key)
          }))
        });

        // Transform the API data to match our SportPage component's expected format
        const transformedGames: SportPageGame[] = oddsData.map((game: APIGame) => {
          // Debug: Log each game's data
          console.log('Processing game:', {
            id: game.id,
            teams: {
              home: game.homeTeam,
              away: game.awayTeam
            },
            bookmakers: game.bookmakers?.length || 0,
            firstBookmaker: game.bookmakers?.[0]?.key,
            markets: game.bookmakers?.[0]?.markets?.map(m => m.key)
          });

          // Find the moneyline market (h2h)
          const mainBookmaker = game.bookmakers[0];
          const h2hMarket = mainBookmaker?.markets?.find(m => m.key === 'h2h');
          const homeOdds = h2hMarket?.outcomes?.find(o => o.name === game.homeTeam)?.price;
          const awayOdds = h2hMarket?.outcomes?.find(o => o.name === game.awayTeam)?.price;

          // Debug: Log the odds matching
          console.log('Odds matching:', {
            homeTeam: game.homeTeam,
            awayTeam: game.awayTeam,
            outcomes: h2hMarket?.outcomes?.map(o => ({
              name: o.name,
              price: o.price
            })),
            foundHomeOdds: homeOdds,
            foundAwayOdds: awayOdds
          });

          return {
            id: game.id,
            homeTeam: game.homeTeam,
            awayTeam: game.awayTeam,
            time: game.commenceTime,
            odds: {
              home: homeOdds ? (homeOdds >= 0 ? `+${homeOdds}` : homeOdds.toString()) : 'N/A',
              away: awayOdds ? (awayOdds >= 0 ? `+${awayOdds}` : awayOdds.toString()) : 'N/A'
            },
            featured: false
          };
        });
        
        console.log('Final transformed games:', transformedGames);
        setGames(transformedGames);
      } catch (error) {
        console.error('Error fetching MLB games:', error);
        setError('Failed to load games');
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        Error: {error}
      </div>
    );
  }

  return (
    <>
      {lastUpdate && (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Last updated: {lastUpdate.toLocaleString()}
          </Typography>
        </Box>
      )}
      <SportPage
        sport="baseball_mlb"
        league="MLB"
        games={games}
        loading={loading}
      />
    </>
  );
};

export default MLB; 