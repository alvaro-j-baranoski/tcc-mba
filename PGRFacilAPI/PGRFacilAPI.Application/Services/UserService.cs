using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using PGRFacilAPI.Application.DTOs.Users;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Interfaces;
using PGRFacilAPI.Domain.Models;
using System.Security.Claims;
using System.Text;

namespace PGRFacilAPI.Application.Services
{
    public class UserService(IConfiguration configuration, UserManager<User> userManager, IUsersRepository usersRepository) : IUserService
    {
        private const int JWT_EXPIRATION_TIME_IN_MINUTES = 360;
        private readonly string? jwtIssuer = configuration["Jwt:Issuer"];
        private readonly string? jwtAudience = configuration["Jwt:Audience"];
        private readonly string? jwtKey = configuration["Jwt:Key"];

        public async Task Register(CreateUserDTO createUserDTO)
        {
            var user = new User
            {
                UserName = createUserDTO.Email,
                Email = createUserDTO.Email,
            };

            await usersRepository.Create(userManager, user, createUserDTO.Password);
        }

        public async Task<LoginResponseDTO> Login(LoginRequestDTO loginRequestDTO)
        {
            User? user = await userManager.FindByEmailAsync(loginRequestDTO.Email);

            if (user is null || user.Email is null || !await userManager.CheckPasswordAsync(user, loginRequestDTO.Password))
            {
                throw new UserNotFoundException();
            }

            var roles = await userManager.GetRolesAsync(user);

            return new LoginResponseDTO
            {
                Email = user.Email,
                Roles = roles,
                Token = CreateAuthenticationToken(user.Id, user.Email, roles),
            };
        }

        private string CreateAuthenticationToken(string id, string email, IEnumerable<string> roles)
        {
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey!));
            var credentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            List<Claim> claims =
            [
                new Claim(JwtRegisteredClaimNames.Sub, id),
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
            IEnumerable<User> users =  await usersRepository.GetAll();

            foreach (var user in users)
            {
                result.Add(new UserDTO
                {
                    Id = user.Id,
                    Email = user.Email!,
                    Roles = user.Roles
                });
            }

            return result;
        }

        public async Task Update(Guid guid, UpdateUserDTO updateUserDTO)
        {
            User? user = await userManager.FindByIdAsync(guid.ToString());

            if (user is null)
            {
                throw new UserNotFoundException();
            }

            var currentUserRoles = await userManager.GetRolesAsync(user);

            var rolesToAdd = updateUserDTO.Roles.Except(currentUserRoles);
            var rolesToRemove = currentUserRoles.Except(updateUserDTO.Roles);

            await usersRepository.UpdateRoles(userManager, user, rolesToAdd, rolesToRemove);
        }

        public async Task Delete(Guid guid)
        {
            User? user = await userManager.FindByIdAsync(guid.ToString());

            if (user is null)
            {
                throw new UserNotFoundException();
            }

            var deleteResult = await userManager.DeleteAsync(user);

            if (!deleteResult.Succeeded)
            {
                throw new DatabaseOperationException();
            }
        }
    }
}
