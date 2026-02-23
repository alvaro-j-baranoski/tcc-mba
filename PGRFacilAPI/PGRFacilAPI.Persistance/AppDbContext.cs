using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PGRFacilAPI.Persistance.Ghe;
using PGRFacilAPI.Persistance.Risco;
using PGRFacilAPI.Persistance.Usuario;

namespace PGRFacilAPI.Persistance
{
    public class AppDbContext : IdentityDbContext<UsuarioTable>
    {
        public AppDbContext() { }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<RiscoTable> Riscos { get; set; }
        public DbSet<GheTable> Ghes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<GheTable>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasMany(e => e.Riscos).WithOne(e => e.Ghe).HasForeignKey(e => e.GheId).OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<RiscoTable>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Local).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Atividades).HasMaxLength(500);
                entity.Property(e => e.Perigos).IsRequired();
            });
        }

        // Uncomment for generating migrations.
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=pgrfacildb;Username=postgres;Password=yourpassword");
        //}
    }
}
