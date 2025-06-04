using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using BetStats.Api.Models;

namespace BetStats.Api.Services
{
    public interface IOddsApiService
    {
        Task<IEnumerable<Game>> GetOddsAsync(string sport, string regions = "us", string markets = "h2h,spreads,totals");
        Task<int> GetRemainingApiCallsAsync();
    }

    public class OddsApiService : IOddsApiService
    {
        private readonly HttpClient _httpClient;
        private readonly OddsApiConfig _config;

        public OddsApiService(HttpClient httpClient, IOptions<OddsApiConfig> config)
        {
            _httpClient = httpClient;
            _config = config.Value;
            _httpClient.BaseAddress = new Uri(_config.BaseUrl);
        }

        public async Task<IEnumerable<Game>> GetOddsAsync(string sport, string regions = "us", string markets = "h2h,spreads,totals")
        {
            try
            {
                var response = await _httpClient.GetFromJsonAsync<List<Game>>(
                    $"sports/{sport}/odds?apiKey={_config.ApiKey}&regions={regions}&markets={markets}");
                return response ?? new List<Game>();
            }
            catch (Exception ex)
            {
                // In a production environment, you should log this error
                Console.WriteLine($"Error fetching odds: {ex.Message}");
                return new List<Game>();
            }
        }

        public async Task<int> GetRemainingApiCallsAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync($"sports?apiKey={_config.ApiKey}");
                var remaining = response.Headers.TryGetValues("x-requests-remaining", out var values) 
                    ? int.Parse(values.First()) 
                    : 0;
                return remaining;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error checking API usage: {ex.Message}");
                return 0;
            }
        }
    }
} 