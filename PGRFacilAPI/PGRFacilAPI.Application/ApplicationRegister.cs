using Microsoft.Extensions.DependencyInjection;
using PGRFacilAPI.Application.Ghe.GheCreate;
using PGRFacilAPI.Application.Ghe.GheGetAll;
using PGRFacilAPI.Application.Ghe.GheGetById;
using PGRFacilAPI.Application.Ghe.GheUpdate;
using PGRFacilAPI.Application.User.UserDelete;
using PGRFacilAPI.Application.User.UserGetAll;
using PGRFacilAPI.Application.User.UserLogin;
using PGRFacilAPI.Application.User.UserRegister;
using PGRFacilAPI.Application.User.UserUpdate;

namespace PGRFacilAPI.Application
{
    public static class ApplicationRegister
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            // Register application services here
            services.AddScoped<Services.IRisksService, Services.RisksService>();
            services.AddScoped<Services.IProgramsService, Services.ProgramsService>();
            services.AddScoped<Services.IReportsService, Services.RelatoriosService>();

            services.AddScoped<UserRegisterUseCase>();
            services.AddScoped<UserLoginUseCase>();
            services.AddScoped<UserGetAllUseCase>();
            services.AddScoped<UserUpdateUseCase>();
            services.AddScoped<UserDeleteUseCase>();

            services.AddScoped<GheCreateUseCase>();
            services.AddScoped<GheGetByIdUseCase>();
            services.AddScoped<GheGetAllUseCase>();
            services.AddScoped<GheUpdateUseCase>();

            return services;
        }
    }
}
