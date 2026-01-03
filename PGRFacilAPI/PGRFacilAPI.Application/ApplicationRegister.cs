using Microsoft.Extensions.DependencyInjection;

namespace PGRFacilAPI.Application
{
    public static class ApplicationRegister
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            // Register application services here
            services.AddScoped<Services.IUserService, Services.UserService>();
            services.AddScoped<Services.IRiscoService, Services.RiscoService>();
            services.AddScoped<Services.IProgramaService, Services.ProgramaService>();
            services.AddScoped<Services.IRelatoriosService, Services.RelatoriosService>();
            return services;
        }
    }
}
