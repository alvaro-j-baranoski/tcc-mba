using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PGRFacilAPI.Application.Interfaces;
using PGRFacilAPI.Persistance.Repositories;

namespace PGRFacilAPI.Persistance
{
    public static class PersistanceRegister
    {
        public static IServiceCollection AddPersistance(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            ArgumentNullException.ThrowIfNull(connectionString, "Connection string 'DefaultConnection' not found.");
            services.AddScoped<IRiscoRepository>(_ => new RiscoRepository(connectionString));
            return services;
        }
    }
}
