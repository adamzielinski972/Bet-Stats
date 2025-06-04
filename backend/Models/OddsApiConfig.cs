namespace BetStats.Api.Models
{
    public class OddsApiConfig
    {
        public string ApiKey { get; set; } = string.Empty;
        public string BaseUrl { get; set; } = "https://api.the-odds-api.com/v4/";
    }
} 