using System;
using System.ComponentModel.DataAnnotations;

namespace BetStats.Api.Models
{
    public class Bet
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public decimal StakeAmount { get; set; }

        [Required]
        public decimal Odds { get; set; }

        public decimal? PotentialWinnings { get; set; }

        [Required]
        public DateTime PlacedDate { get; set; }

        public DateTime? SettledDate { get; set; }

        [Required]
        public BetStatus Status { get; set; }

        public string? Notes { get; set; }

        // Navigation properties
        public int SportId { get; set; }
        public Sport Sport { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }

    public enum BetStatus
    {
        Pending,
        Won,
        Lost,
        Void,
        Cancelled
    }
} 