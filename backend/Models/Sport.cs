using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BetStats.Api.Models
{
    public class Sport
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        public string? Description { get; set; }

        // Navigation property
        public ICollection<Bet> Bets { get; set; }
    }
} 