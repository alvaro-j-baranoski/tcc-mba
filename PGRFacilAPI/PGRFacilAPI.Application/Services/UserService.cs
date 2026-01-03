using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using PGRFacilAPI.Application.DTOs;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Domain.Models;
using System.Security.Claims;
using System.Text;

namespace PGRFacilAPI.Application.Services
{
    public class UserService(IConfiguration configuration, UserManager<Usuario> userManager) : IUserService
    {
        private const int TEMPO_DE_EXPIRACAO_JWT_EM_MINUTOS = 360;
        private readonly string? jwtIssuer = configuration["Jwt:Issuer"];
        private readonly string? jwtAudience = configuration["Jwt:Audience"];
        private readonly string? jwtKey = configuration["Jwt:Key"];

        public async Task Register(CreateUserDTO createUsuarioDTO)
        {
            var usuario = new Usuario
            {
                UserName = createUsuarioDTO.Email,
                Email = createUsuarioDTO.Email,
            };

            IdentityResult identityResult = await userManager.CreateAsync(usuario, createUsuarioDTO.Password);

            if (!identityResult.Succeeded)
            {
                throw new InvalidOperationException();
            }

            IdentityResult identityRoleResult = await userManager.AddToRoleAsync(usuario, Roles.Reader);

            if (!identityRoleResult.Succeeded)
            {
                throw new InvalidOperationException();
            }
        }

        public async Task<LoginDTO> Login(UsuarioDTO usuarioDTO)
        {
            Usuario? usuario = await userManager.FindByEmailAsync(usuarioDTO.Email);

            if (usuario is null || usuario.Email is null || !await userManager.CheckPasswordAsync(usuario, usuarioDTO.Password))
            {
                throw new UserNotFoundException();
            }

            var chaveDeAssinatura = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey!));
            var credenciais = new SigningCredentials(chaveDeAssinatura, SecurityAlgorithms.HmacSha256);

            List<Claim> claims =
            [
                new Claim(JwtRegisteredClaimNames.Sub, usuario.Id),
                new Claim(JwtRegisteredClaimNames.Email, usuario.Email)
            ];

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(TEMPO_DE_EXPIRACAO_JWT_EM_MINUTOS),
                SigningCredentials = credenciais,
                Issuer = jwtIssuer,
                Audience = jwtAudience
            };

            var tokenHandler = new JsonWebTokenHandler();
            string token = tokenHandler.CreateToken(tokenDescriptor);

            return new LoginDTO
            {
                Email = usuario.Email,
                Token = token
            };
        }
    }
}
