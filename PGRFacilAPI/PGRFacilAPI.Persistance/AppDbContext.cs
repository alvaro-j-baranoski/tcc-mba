using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PGRFacilAPI.Persistance.Ghe;
using PGRFacilAPI.Persistance.Perigo;
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
        public DbSet<PerigoTable> Perigos { get; set; }
        public DbSet<RiscoPerigoTable> RiscoPerigos { get; set; }

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
                entity.HasMany(e => e.Perigos)
                    .WithMany(e => e.Riscos)
                    .UsingEntity<RiscoPerigoTable>(
                        l => l.HasOne<PerigoTable>().WithMany().HasForeignKey(e => e.PerigoId),
                        r => r.HasOne<RiscoTable>().WithMany().HasForeignKey(e => e.RiscoId),
                        j => j.HasKey(e => new { e.RiscoId, e.PerigoId }));
            });

            modelBuilder.Entity<PerigoTable>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Descricao).IsRequired().HasMaxLength(500);
                entity.HasIndex(e => e.Descricao).IsUnique();
            });
        }

        // Uncomment for generating migrations.
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=pgrfacildb;Username=postgres;Password=yourpassword");
        //}
    }
}
