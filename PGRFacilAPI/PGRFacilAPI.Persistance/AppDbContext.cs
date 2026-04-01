using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PGRFacilAPI.Persistance.Dano;
using PGRFacilAPI.Persistance.Ghe;
using PGRFacilAPI.Persistance.Perigo;
using PGRFacilAPI.Persistance.PlanoDeAcao;
using PGRFacilAPI.Persistance.Risco;
using PGRFacilAPI.Persistance.Usuario;
using PGRFacilAPI.Persistance.Versao;

namespace PGRFacilAPI.Persistance
{
    public class AppDbContext : IdentityDbContext<UsuarioTable>
    {
        public AppDbContext() { }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<RiscoTable> Riscos { get; set; }
        public DbSet<GheTable> Ghes { get; set; }
        public DbSet<VersaoTable> Versoes { get; set; }
        public DbSet<PerigoTable> Perigos { get; set; }
        public DbSet<RiscoPerigoTable> RiscoPerigos { get; set; }
        public DbSet<DanoTable> Danos { get; set; }
        public DbSet<RiscoDanoTable> RiscoDanos { get; set; }
        public DbSet<PlanoDeAcaoTable> PlanosDeAcao { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<GheTable>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasMany(e => e.Riscos).WithOne(e => e.Ghe).HasForeignKey(e => e.GheId).OnDelete(DeleteBehavior.Cascade);
                entity.HasMany(e => e.Versoes).WithOne(e => e.Ghe).HasForeignKey(e => e.GheId).OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<VersaoTable>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.DataCriacao).IsRequired();
                entity.Property(e => e.Observacoes).HasMaxLength(500).IsRequired();
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

            modelBuilder.Entity<DanoTable>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Descricao).IsRequired().HasMaxLength(500);
                entity.HasIndex(e => e.Descricao).IsUnique();
                entity.HasMany(e => e.Riscos)
                    .WithMany(e => e.Danos)
                    .UsingEntity<RiscoDanoTable>(
                        l => l.HasOne<RiscoTable>().WithMany().HasForeignKey(e => e.RiscoId),
                        r => r.HasOne<DanoTable>().WithMany().HasForeignKey(e => e.DanoId),
                        j => j.HasKey(e => new { e.RiscoId, e.DanoId }));
            });

            modelBuilder.Entity<PlanoDeAcaoTable>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Responsavel).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Descricao).IsRequired().HasMaxLength(500);
                entity.Property(e => e.DataInicio).IsRequired();
                entity.Property(e => e.DataConclusao).IsRequired();
                entity.HasOne(e => e.Risco).WithOne(e => e.PlanoDeAcao).HasForeignKey<PlanoDeAcaoTable>(e => e.RiscoId).OnDelete(DeleteBehavior.Cascade);
            });
        }

        // Uncomment for generating migrations.
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=pgrfacildb;Username=postgres;Password=yourpassword");
        //}
    }
}
