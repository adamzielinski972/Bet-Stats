require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const cors = require('cors');
const axios = require('axios');
const Odds = require('./models/Odds');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Function to fetch odds from the API
async function fetchOddsFromAPI(sport) {
  try {
    console.log('API Key:', process.env.ODDS_API_KEY); // Temporary debug log
    const response = await axios.get(`${process.env.ODDS_API_HOST}/v4/sports/${sport}/odds`, {
      params: {
        apiKey: process.env.ODDS_API_KEY,
        regions: 'us',
        markets: 'h2h',
        oddsFormat: 'american'
      }
    });

    // Log the first game's data structure
    if (response.data && response.data.length > 0) {
      console.log('First game data structure:', JSON.stringify(response.data[0], null, 2));
    }

    // Transform the data to include team names properly
    const transformedData = response.data.map(game => ({
      id: game.id,
      sportKey: game.sport_key,
      sportTitle: game.sport_title,
      commenceTime: game.commence_time,
      homeTeam: game.home_team,
      awayTeam: game.away_team,
      bookmakers: game.bookmakers?.map(bookmaker => ({
        key: bookmaker.key,
        title: bookmaker.title,
        lastUpdate: bookmaker.last_update,
        markets: bookmaker.markets?.map(market => ({
          key: market.key,
          lastUpdate: market.last_update,
          outcomes: market.outcomes?.map(outcome => ({
            name: outcome.name,
            price: outcome.price
          }))
        }))
      }))
    }));

    console.log('Transformed first game:', JSON.stringify(transformedData[0], null, 2));
    return transformedData;
  } catch (error) {
    console.error(`Error fetching odds for ${sport}:`, error.response ? error.response.data : error.message);
    throw error;
  }
}

// Function to update odds in database
async function updateOdds(sport) {
  try {
    console.log(`Updating odds for ${sport}...`);
    const games = await fetchOddsFromAPI(sport);
    
    await Odds.findOneAndUpdate(
      { sport },
      { 
        sport,
        games,
        lastUpdated: new Date()
      },
      { upsert: true, new: true }
    );

    console.log(`Successfully updated odds for ${sport}`);
  } catch (error) {
    console.error(`Failed to update odds for ${sport}:`, error);
  }
}

// Schedule daily updates at 00:00
cron.schedule('0 0 * * *', async () => {
  console.log('Running daily odds update...');
  // Update all sports
  await Promise.all([
    updateOdds('baseball_mlb'),
    updateOdds('basketball_nba'),
    updateOdds('icehockey_nhl'),
    updateOdds('americanfootball_nfl')
  ]).catch(console.error);
});

// API Endpoints

// Get odds for a sport
app.get('/api/odds/:sport', async (req, res) => {
  try {
    const { sport } = req.params;
    const oddsData = await Odds.findOne({ sport }).sort({ lastUpdated: -1 });

    if (!oddsData) {
      // If no data exists, fetch it for the first time
      await updateOdds(sport);
      const newOddsData = await Odds.findOne({ sport }).sort({ lastUpdated: -1 });
      
      if (!newOddsData) {
        return res.status(404).json({ message: 'No odds data available' });
      }
      
      return res.json(newOddsData.games);
    }

    // Check if data is older than 24 hours
    const isStale = new Date() - oddsData.lastUpdated > 24 * 60 * 60 * 1000;
    
    if (isStale) {
      // Update in background for next request
      updateOdds(sport).catch(console.error);
    }

    res.json(oddsData.games);
  } catch (error) {
    console.error('Error fetching odds:', error);
    res.status(500).json({ message: 'Error fetching odds data' });
  }
});

// Get last update time for a sport
app.get('/api/odds/:sport/lastUpdate', async (req, res) => {
  try {
    const { sport } = req.params;
    const oddsData = await Odds.findOne({ sport }).sort({ lastUpdated: -1 });
    
    if (!oddsData) {
      return res.status(404).json({ message: 'No odds data available' });
    }

    res.json({ lastUpdated: oddsData.lastUpdated });
  } catch (error) {
    console.error('Error fetching last update time:', error);
    res.status(500).json({ message: 'Error fetching update time' });
  }
});

const PORT = process.env.PORT || 3621;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Initial update on server start for all sports
  Promise.all([
    updateOdds('baseball_mlb'),
    updateOdds('basketball_nba'),
    updateOdds('icehockey_nhl'),
    updateOdds('americanfootball_nfl')
  ]).catch(console.error);
}); 