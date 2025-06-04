using System;
using System.Collections.Generic;

namespace BetStats.Api.Models
{
    public class Game
    {
        public string Id { get; set; } = string.Empty;
        public string SportKey { get; set; } = string.Empty;
        public string SportTitle { get; set; } = string.Empty;
        public DateTime CommenceTime { get; set; }
        public string HomeTeam { get; set; } = string.Empty;
        public string AwayTeam { get; set; } = string.Empty;
        public List<Bookmaker> Bookmakers { get; set; } = new();
    }

    public class Bookmaker
    {
        public string Key { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public DateTime LastUpdate { get; set; }
        public List<Market> Markets { get; set; } = new();
    }

    public class Market
    {
        public string Key { get; set; } = string.Empty;
        public DateTime LastUpdate { get; set; }
        public List<Outcome> Outcomes { get; set; } = new();
    }

    public class Outcome
    {
        public string Name { get; set; } = string.Empty;
        public double Price { get; set; }
        public double? Point { get; set; }
    }
} 