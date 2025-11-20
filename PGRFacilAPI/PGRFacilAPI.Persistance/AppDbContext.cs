using Microsoft.EntityFrameworkCore;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Persistance
{
    public class AppDbContext : DbContext
    {
        public AppDbContext() { }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Risco> Riscos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Risco>(entity =>
            {
                entity.HasKey(e => e.Guid);
                entity.Property(e => e.Local).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Atividades).HasMaxLength(500);
                entity.Property(e => e.Perigos).IsRequired();
            });
        }
    }
}
