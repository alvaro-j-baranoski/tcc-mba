using Microsoft.EntityFrameworkCore;
using PGRFacilAPI.Application.Interfaces;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Persistance.Repositories
{
    public class UsersRepository(AppDbContext dbContext) : IUsersRepository
    {
        public async Task<IEnumerable<User>> GetAll()
        {
            return (
                from u in dbContext.Users
                select new User
                {
                    Id = u.Id,
                    Email = u.Email,
                    Roles = (
                        from ur in dbContext.UserRoles
                        join r in dbContext.Roles on ur.RoleId equals r.Id
                        where ur.UserId == u.Id
                        select r.Name
                    ).ToArray()
                }
            );
        }
    }
}
