using Microsoft.AspNetCore.Identity;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.User
{
    public interface IUserRepository
    {
        Task Create(UserEntity user, string password);
        Task<IEnumerable<UserEntity>> GetAll();
        Task UpdateRoles(UserEntity user, IEnumerable<string> rolesToAdd, IEnumerable<string> rolesToRemove);
    
        Task<UserEntity?> FindByEmailAsync(string email);
        Task<UserEntity?> FindByIdAsync(Guid id);
        Task<bool> CheckPasswordAsync(UserEntity user, string password);
        Task<IEnumerable<string>> GetRolesAsync(UserEntity user);
        Task DeleteAsync(Guid userId);
    }
}
