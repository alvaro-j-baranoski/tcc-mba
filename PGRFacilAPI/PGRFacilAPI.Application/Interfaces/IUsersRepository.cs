using Microsoft.AspNetCore.Identity;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Interfaces
{
    public interface IUsersRepository
    {
        Task Create(UserManager<User> userManager, User user, string password);
        Task<IEnumerable<User>> GetAll();
        Task UpdateRoles(UserManager<User> userManager, User user, IEnumerable<string> rolesToAdd, IEnumerable<string> rolesToRemove);
    }
}
