using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace BetStats.Api.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        // Navigation property
        public ICollection<Bet> Bets { get; set; }
    }
} 