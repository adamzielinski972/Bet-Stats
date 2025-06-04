using System;

namespace BetStats.Api.Models
{
    public class PlayerProp
    {
        public string PlayerId { get; set; } = string.Empty;
        public string PlayerName { get; set; } = string.Empty;
        public string Team { get; set; } = string.Empty;
        public string PropType { get; set; } = string.Empty;
        public string Market { get; set; } = string.Empty;
        public double Line { get; set; }
        public double OverOdds { get; set; }
        public double UnderOdds { get; set; }
        public string Sportsbook { get; set; } = string.Empty;
        public DateTime LastUpdated { get; set; }
        public string Sport { get; set; } = string.Empty;
        public string League { get; set; } = string.Empty;
        public DateTime GameTime { get; set; }
    }
} 