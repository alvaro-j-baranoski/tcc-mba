using Microsoft.AspNetCore.Identity;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Interfaces;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Persistance.Repositories
{
    public class UsersRepository(AppDbContext dbContext) : IUsersRepository
    {
        public async Task Create(UserManager<User> userManager, User user, string password)
        {
            using var transaction = await dbContext.Database.BeginTransactionAsync();

            try
            {
                IdentityResult identityResult = await userManager.CreateAsync(user, password);

                if (!identityResult.Succeeded)
                {
                    throw new DatabaseOperationException();
                }

                IdentityResult identityRoleResult = await userManager.AddToRoleAsync(user, Roles.Reader);

                if (!identityRoleResult.Succeeded)
                {
                    throw new DatabaseOperationException();
                }

                await transaction.CommitAsync();
            }
            catch (DatabaseOperationException)
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

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

        public async Task UpdateRoles(UserManager<User> userManager, User user, IEnumerable<string> rolesToAdd, IEnumerable<string> rolesToRemove)
        {
            using var transaction = await dbContext.Database.BeginTransactionAsync();

            try
            {
                if (rolesToAdd.Any())
                {
                    var addResult = await userManager.AddToRolesAsync(user, rolesToAdd);
                    if (!addResult.Succeeded)
                    {
                        throw new DatabaseOperationException();
                    }
                }

                if (rolesToRemove.Any())
                {
                    var removeResult = await userManager.RemoveFromRolesAsync(user, rolesToRemove);
                    if (!removeResult.Succeeded)
                    {
                        throw new DatabaseOperationException();
                    }
                }

                await transaction.CommitAsync();
            }
            catch (DatabaseOperationException)
            {
                await transaction.RollbackAsync();
                throw;
            }

        }
    }
}
