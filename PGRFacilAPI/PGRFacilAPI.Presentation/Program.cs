using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PGRFacilAPI.Application;
using PGRFacilAPI.Domain.Models;
using PGRFacilAPI.Persistance;
using System.Text;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        AddApplicationServices(builder);
        ConfigureIdentity(builder);
        ConfigureAuthentication(builder);

        builder.Services.AddAuthorization();

        string corsPolicyName = "MyCORSPolicy";
        ConfigureCors(builder, corsPolicyName);

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
            Migrate(app);
        }

        app.UseCors(corsPolicyName);
        app.UseHttpsRedirection();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();
        app.Run();
    }

    private static void AddApplicationServices(WebApplicationBuilder builder)
    {
        builder.Services.AddPersistance(builder.Configuration);
        builder.Services.AddApplicationServices();
    }

    private static void ConfigureIdentity(WebApplicationBuilder builder)
    {
        builder.Services
            .AddIdentity<Usuario, IdentityRole>(options =>
            {
                options.User.RequireUniqueEmail = true;
            })
            .AddEntityFrameworkStores<AppDbContext>();
    }

    private static void ConfigureAuthentication(WebApplicationBuilder builder)
    {
        builder.Services.
            AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters.ValidIssuer = "todo-pegar-das-variaveis-de-ambiente";
                options.TokenValidationParameters.ValidAudience = "todo-pegar-das-variaveis-de-ambiente";
                options.TokenValidationParameters.IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("todo-pegar-das-variaveis-de-ambiente"));
            });
    }

    private static void ConfigureCors(WebApplicationBuilder builder, string corsPolicyName)
    {
        builder.Services.AddCors(options =>
        {
            options.AddPolicy(corsPolicyName, policy =>
            {
                policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
            });
        });
    }

    private static void Migrate(WebApplication app)
    {
        // Apply database migration.
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        dbContext.Database.Migrate();
    }
}