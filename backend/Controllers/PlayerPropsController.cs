using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BetStats.Api.Models;
using BetStats.Api.Services;

namespace BetStats.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayerPropsController : ControllerBase
    {
        private readonly IOddsJamService _oddsJamService;

        public PlayerPropsController(IOddsJamService oddsJamService)
        {
            _oddsJamService = oddsJamService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlayerProp>>> GetPlayerProps(
            [FromQuery] string sport = "NFL",
            [FromQuery] string league = "NFL")
        {
            var props = await _oddsJamService.GetPlayerPropsAsync(sport, league);
            return Ok(props);
        }
    }
} 