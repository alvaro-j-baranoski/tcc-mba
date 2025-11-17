using Microsoft.Extensions.DependencyInjection;

namespace PGRFacilAPI.Application
{
    public static class ApplicationRegister
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            // Register application services here
            services.AddScoped<Services.IRiscoService, Services.RiscoService>();
            return services;
        }
    }
}
