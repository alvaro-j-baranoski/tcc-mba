using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Persistance
{
    public class AppDbContext : IdentityDbContext<Usuario>
    {
        public AppDbContext() { }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Risco> Riscos { get; set; }
        public DbSet<Programa> Programas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Programa>(entity =>
            {
                entity.HasKey(e => e.Guid);
                entity.HasMany(e => e.Riscos).WithOne(e => e.Programa).HasForeignKey(e => e.ProgramaID).OnDelete(DeleteBehavior.Cascade);
            });

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
