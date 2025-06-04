namespace BetStats.Api.Models
{
    public class OddsJamConfig
    {
        public string ApiKey { get; set; } = string.Empty;
        public string BaseUrl { get; set; } = "https://api.oddsjam.com/api/v2/";
    }
} 