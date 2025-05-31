using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using BetStats.Api.Models;

namespace BetStats.Api.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Bet> Bets { get; set; }
        public DbSet<Sport> Sports { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Configure relationships
            builder.Entity<Bet>()
                .HasOne(b => b.Sport)
                .WithMany(s => s.Bets)
                .HasForeignKey(b => b.SportId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Bet>()
                .HasOne(b => b.User)
                .WithMany(u => u.Bets)
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure decimal precision
            builder.Entity<Bet>()
                .Property(b => b.StakeAmount)
                .HasPrecision(18, 2);

            builder.Entity<Bet>()
                .Property(b => b.Odds)
                .HasPrecision(18, 2);

            builder.Entity<Bet>()
                .Property(b => b.PotentialWinnings)
                .HasPrecision(18, 2);
        }
    }
} 