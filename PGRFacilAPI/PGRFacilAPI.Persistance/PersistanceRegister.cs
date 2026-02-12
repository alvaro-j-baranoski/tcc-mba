using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PGRFacilAPI.Application.Ghe;
using PGRFacilAPI.Application.Interfaces;
using PGRFacilAPI.Application.User;
using PGRFacilAPI.Persistance.Ghe;
using PGRFacilAPI.Persistance.Repositories;
using PGRFacilAPI.Persistance.User;

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

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRisksRepository, RiscoRepository>();
            services.AddScoped<IGheRepository, GheRepository>();
            return services;
        }
    }
}
