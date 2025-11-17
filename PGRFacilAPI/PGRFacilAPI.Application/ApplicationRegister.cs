using Microsoft.Extensions.DependencyInjection;

namespace PGRFacilAPI.Application
{
    public static class ApplicationRegister
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            // Register application services here
            services.AddScoped<Services.IRiscoService, Services.RiscoService>();
            return services;
        }
    }
}
