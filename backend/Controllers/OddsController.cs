using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BetStats.Api.Models;
using BetStats.Api.Services;

namespace BetStats.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OddsController : ControllerBase
    {
        private readonly IOddsApiService _oddsApiService;

        public OddsController(IOddsApiService oddsApiService)
        {
            _oddsApiService = oddsApiService;
        }

        [HttpGet("{sport}")]
        public async Task<ActionResult<IEnumerable<Game>>> GetOdds(
            string sport,
            [FromQuery] string regions = "us",
            [FromQuery] string markets = "h2h,spreads,totals")
        {
            var odds = await _oddsApiService.GetOddsAsync(sport, regions, markets);
            return Ok(odds);
        }

        [HttpGet("usage")]
        public async Task<ActionResult<int>> GetApiUsage()
        {
            var remaining = await _oddsApiService.GetRemainingApiCallsAsync();
            return Ok(new { RemainingCalls = remaining });
        }
    }
} 