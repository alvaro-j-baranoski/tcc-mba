using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PGRFacilAPI.Application.Dano;
using PGRFacilAPI.Application.Ghe;
using PGRFacilAPI.Application.Perigo;
using PGRFacilAPI.Application.PlanoDeAcao;
using PGRFacilAPI.Application.Risco;
using PGRFacilAPI.Application.Usuario;
using PGRFacilAPI.Persistance.Dano;
using PGRFacilAPI.Persistance.Ghe;
using PGRFacilAPI.Persistance.Perigo;
using PGRFacilAPI.Persistance.PlanoDeAcao;
using PGRFacilAPI.Persistance.Risco;
using PGRFacilAPI.Persistance.Usuario;

namespace PGRFacilAPI.Persistance
{
    public static class PersistanceRegister
    {
        public static IServiceCollection AddPersistance(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            ArgumentNullException.ThrowIfNull(connectionString, "Connection string 'DefaultConnection' not found.");
            services.AddDbContextPool<AppDbContext>(options => options.UseNpgsql(connectionString, 
                b => b.MigrationsAssembly(typeof(AppDbContext).Assembly.FullName)));

            services.AddScoped<IUsuarioRepository, UsuarioRepository>();
            services.AddScoped<IRiscoRepository, RiscoRepository>();
            services.AddScoped<IGheRepository, GheRepository>();
            services.AddScoped<IPerigoRepository, PerigoRepository>();
            services.AddScoped<IDanoRepository, DanoRepository>();
            services.AddScoped<IPlanoDeAcaoRepository, PlanoDeAcaoRepository>();
            return services;
        }
    }
}
