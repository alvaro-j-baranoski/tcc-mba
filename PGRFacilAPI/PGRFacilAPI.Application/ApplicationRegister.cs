using Microsoft.Extensions.DependencyInjection;
using PGRFacilAPI.Application.Ghe.GheCreate;
using PGRFacilAPI.Application.Ghe.GheDelete;
using PGRFacilAPI.Application.Ghe.GheGetAll;
using PGRFacilAPI.Application.Ghe.GheGetById;
using PGRFacilAPI.Application.Ghe.GheUpdate;
using PGRFacilAPI.Application.Perigo.PerigoCreate;
using PGRFacilAPI.Application.Relatorio.MatrizDeRisco;
using PGRFacilAPI.Application.Risco.RiscoCreate;
using PGRFacilAPI.Application.Risco.RiscoDelete;
using PGRFacilAPI.Application.Risco.RiscoGetAll;
using PGRFacilAPI.Application.Risco.RiscoGetById;
using PGRFacilAPI.Application.Risco.RiscoUpdate;
using PGRFacilAPI.Application.Usuario.UsuarioDelete;
using PGRFacilAPI.Application.Usuario.UsuarioGetAll;
using PGRFacilAPI.Application.Usuario.UsuarioLogin;
using PGRFacilAPI.Application.Usuario.UsuarioRegister;
using PGRFacilAPI.Application.Usuario.UsuarioUpdate;

namespace PGRFacilAPI.Application
{
    public static class ApplicationRegister
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<UsuarioRegisterUseCase>();
            services.AddScoped<UsuarioLoginUseCase>();
            services.AddScoped<UsuarioGetAllUseCase>();
            services.AddScoped<UsuarioUpdateUseCase>();
            services.AddScoped<UsuarioDeleteUseCase>();

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

            services.AddScoped<PerigoCreateUseCase>();

            return services;
        }
    }
}
