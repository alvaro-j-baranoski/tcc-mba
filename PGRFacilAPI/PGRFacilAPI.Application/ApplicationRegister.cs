using Microsoft.Extensions.DependencyInjection;
using PGRFacilAPI.Application.Ghe.GheCreate;
using PGRFacilAPI.Application.Ghe.GheDelete;
using PGRFacilAPI.Application.Ghe.GheGetAll;
using PGRFacilAPI.Application.Ghe.GheGetById;
using PGRFacilAPI.Application.Ghe.GheUpdate;
using PGRFacilAPI.Application.Relatorio.MatrizDeRisco;
using PGRFacilAPI.Application.Risco.RiscoCreate;
using PGRFacilAPI.Application.Risco.RiscoDelete;
using PGRFacilAPI.Application.Risco.RiscoGetAll;
using PGRFacilAPI.Application.Risco.RiscoGetById;
using PGRFacilAPI.Application.Risco.RiscoUpdate;
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
            services.AddScoped<UserRegisterUseCase>();
            services.AddScoped<UserLoginUseCase>();
            services.AddScoped<UserGetAllUseCase>();
            services.AddScoped<UserUpdateUseCase>();
            services.AddScoped<UserDeleteUseCase>();

            services.AddScoped<GheCreateUseCase>();
            services.AddScoped<GheGetByIdUseCase>();
            services.AddScoped<GheGetAllUseCase>();
            services.AddScoped<GheUpdateUseCase>();
            services.AddScoped<GheDeleteUseCase>();

            services.AddScoped<RiscoCreateUseCase>();
            services.AddScoped<RiscoGetByIdUseCase>();
            services.AddScoped<RiscoGetAllUseCase>();
            services.AddScoped<RiscoUpdateUseCase>();
            services.AddScoped<RiscoDeleteUseCase>();

            services.AddScoped<MatrizDeRiscoUseCase>();

            return services;
        }
    }
}
