const mongoose = require('mongoose');

const oddsSchema = new mongoose.Schema({
  sport: {
    type: String,
    required: true,
    index: true
  },
  games: [{
    id: String,
    sportKey: String,
    sportTitle: String,
    commenceTime: String,
    homeTeam: String,
    awayTeam: String,
    bookmakers: [{
      key: String,
      title: String,
      lastUpdate: String,
      markets: [{
        key: String,
        lastUpdate: String,
        outcomes: [{
          name: String,
          price: Number
        }]
      }]
    }]
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Index for querying by sport and lastUpdated
oddsSchema.index({ sport: 1, lastUpdated: -1 });

module.exports = mongoose.model('Odds', oddsSchema); 