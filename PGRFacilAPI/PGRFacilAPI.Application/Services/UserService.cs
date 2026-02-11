using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using PGRFacilAPI.Application.DTOs.Users;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.User;
using PGRFacilAPI.Application.User.UserRegister;
using PGRFacilAPI.Domain.Models;
using System.Security.Claims;
using System.Text;

namespace PGRFacilAPI.Application.Services
{
    public class UserService(IConfiguration configuration, IUserRepository usersRepository) : IUserService
    {
        private const int JWT_EXPIRATION_TIME_IN_MINUTES = 360;
        private readonly string? jwtIssuer = configuration["Jwt:Issuer"];
        private readonly string? jwtAudience = configuration["Jwt:Audience"];
        private readonly string? jwtKey = configuration["Jwt:Key"];

        public async Task<LoginResponseDTO> Login(LoginRequestDTO loginRequestDTO)
        {
            UserEntity? user = await usersRepository.FindByEmailAsync(loginRequestDTO.Email);

            if (user is null || user.Email is null || !await usersRepository.CheckPasswordAsync(user, loginRequestDTO.Password))
            {
                throw new UserNotFoundException();
            }

            var roles = await usersRepository.GetRolesAsync(user);

            return new LoginResponseDTO
            {
                Email = user.Email,
                Roles = roles,
                Token = CreateAuthenticationToken(user.Id, user.Email, roles),
            };
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

        public async Task<IEnumerable<UserDTO>> GetAll()
        {
            List<UserDTO> result = [];
            IEnumerable<UserEntity> users = await usersRepository.GetAll();

            foreach (var user in users)
            {
                result.Add(new UserDTO
                {
                    Id = user.Id.ToString(),
                    Email = user.Email!,
                    Roles = user.Roles
                });
            }

            return [.. result.OrderBy(x => x.Email)];
        }

        public async Task Update(Guid guid, UpdateUserDTO updateUserDTO)
        {
            UserEntity? user = await usersRepository.FindByIdAsync(guid);

            if (user is null)
            {
                throw new UserNotFoundException();
            }

            var currentUserRoles = await usersRepository.GetRolesAsync(user);

            var rolesToAdd = updateUserDTO.Roles.Except(currentUserRoles);
            var rolesToRemove = currentUserRoles.Except(updateUserDTO.Roles);

            await usersRepository.UpdateRoles(user, rolesToAdd, rolesToRemove);
        }

        public async Task Delete(Guid guid)
        {
            await usersRepository.DeleteAsync(guid);
        }
    }
}
