using Microsoft.Extensions.DependencyInjection;

namespace PGRFacilAPI.Application
{
    public static class ApplicationRegister
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            // Register application services here
            services.AddScoped<Services.IUserService, Services.UserService>();
            services.AddScoped<Services.IRisksService, Services.RisksService>();
            services.AddScoped<Services.IProgramsService, Services.ProgramsService>();
            services.AddScoped<Services.IReportsService, Services.RelatoriosService>();
            return services;
        }
    }
}
