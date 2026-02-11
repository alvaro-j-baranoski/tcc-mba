using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Domain.Models;
using System.Security.Claims;
using System.Text;

namespace PGRFacilAPI.Application.User.UserLogin
{
    public class UserLoginUseCase(IConfiguration configuration, IUserRepository userRepository)
    {
        private const int JWT_EXPIRATION_TIME_IN_MINUTES = 360;
        private readonly string? jwtIssuer = configuration["Jwt:Issuer"];
        private readonly string? jwtAudience = configuration["Jwt:Audience"];
        private readonly string? jwtKey = configuration["Jwt:Key"];

        public async Task<UserLoginOutputDto> Execute(UserLoginInputDto input)
        {
            UserEntity? user = await userRepository.FindByEmailAsync(input.Email);

            if (user is null || !await userRepository.CheckPasswordAsync(user, input.Password))
            {
                throw new UserNotFoundException();
            }

            IEnumerable<string> roles = await userRepository.GetRolesAsync(user);

            string token = CreateAuthenticationToken(user.Id, user.Email, roles);

            return new UserLoginOutputDto(user.Email, token, roles);
        }

        private string CreateAuthenticationToken(Guid id, string email, IEnumerable<string> roles)
        {
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey!));
            var credentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            List<Claim> claims =
            [
                new Claim(JwtRegisteredClaimNames.Sub, id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, email),
                ..roles.Select(r => new Claim(ClaimTypes.Role, r))
            ];

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(JWT_EXPIRATION_TIME_IN_MINUTES),
                SigningCredentials = credentials,
                Issuer = jwtIssuer,
                Audience = jwtAudience
            };

            var tokenHandler = new JsonWebTokenHandler();
            return tokenHandler.CreateToken(tokenDescriptor);
        }
    }
}
