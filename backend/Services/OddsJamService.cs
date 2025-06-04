using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using BetStats.Api.Models;

namespace BetStats.Api.Services
{
    public interface IOddsJamService
    {
        Task<IEnumerable<PlayerProp>> GetPlayerPropsAsync(string sport, string league);
    }

    public class OddsJamService : IOddsJamService
    {
        private readonly HttpClient _httpClient;
        private readonly OddsJamConfig _config;

        public OddsJamService(HttpClient httpClient, IOptions<OddsJamConfig> config)
        {
            _httpClient = httpClient;
            _config = config.Value;
            
            _httpClient.BaseAddress = new Uri(_config.BaseUrl);
            _httpClient.DefaultRequestHeaders.Add("X-API-KEY", _config.ApiKey);
        }

        public async Task<IEnumerable<PlayerProp>> GetPlayerPropsAsync(string sport, string league)
        {
            try
            {
                var response = await _httpClient.GetFromJsonAsync<List<PlayerProp>>($"props?sport={sport}&league={league}");
                return response ?? new List<PlayerProp>();
            }
            catch (Exception ex)
            {
                // In a production environment, you should log this error
                Console.WriteLine($"Error fetching player props: {ex.Message}");
                return new List<PlayerProp>();
            }
        }
    }
} 