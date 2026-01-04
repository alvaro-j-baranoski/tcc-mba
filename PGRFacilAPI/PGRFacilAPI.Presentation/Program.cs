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
    private static async Task Main(string[] args)
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
        }

        Console.WriteLine("[DEBUG] Applying database migration.");
        await Migrate(app);

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
            .AddIdentity<User, IdentityRole>(options =>
            {
                options.User.RequireUniqueEmail = true;
            })
            .AddEntityFrameworkStores<AppDbContext>();
    }

    private static void ConfigureAuthentication(WebApplicationBuilder builder)
    {
        string? jwtIssuer = builder.Configuration["Jwt:Issuer"];
        string? jwtAudience = builder.Configuration["Jwt:Audience"];
        string? jwtKey = builder.Configuration["Jwt:Key"];

        builder.Services.
            AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters.ValidIssuer = jwtIssuer;
                options.TokenValidationParameters.ValidAudience = jwtAudience;
                options.TokenValidationParameters.IssuerSigningKey =
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
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

    private static async Task Migrate(WebApplication app)
    {
        // Apply database migration.
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        dbContext.Database.Migrate();

        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        if (!await roleManager.RoleExistsAsync(Roles.Editor))
        {
            await roleManager.CreateAsync(new IdentityRole(Roles.Editor));
        }
        if (!await roleManager.RoleExistsAsync(Roles.Reader))
        {
            await roleManager.CreateAsync(new IdentityRole(Roles.Reader));
        }
    }
}