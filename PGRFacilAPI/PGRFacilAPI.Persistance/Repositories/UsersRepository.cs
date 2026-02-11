using Microsoft.AspNetCore.Identity;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Interfaces;
using PGRFacilAPI.Domain.Models;
using PGRFacilAPI.Persistance.User;

namespace PGRFacilAPI.Persistance.Repositories
{
    public class UsersRepository(AppDbContext dbContext, UserManager<UserTable> userManager) : IUsersRepository
    {
        public async Task<bool> CheckPasswordAsync(UserEntity user, string password)
        {
            UserTable? userTable = await userManager.FindByEmailAsync(user.Email);
            return userTable is not null && await userManager.CheckPasswordAsync(userTable, password);
        }

        public async Task<IdentityResult> Create(UserEntity user, string password)
        {
            using var transaction = await dbContext.Database.BeginTransactionAsync();

            try
            {
                var userTable = new UserTable { Email = user.Email, UserName = user.Email };
                IdentityResult identityResult = await userManager.CreateAsync(userTable, password);

                if (!identityResult.Succeeded)
                {
                    return identityResult;
                }

                IdentityResult identityRoleResult = await userManager.AddToRoleAsync(userTable, Roles.Reader);

                if (!identityRoleResult.Succeeded)
                {
                    return identityRoleResult;
                }

                await transaction.CommitAsync();
                return identityRoleResult;
            }
            catch (DatabaseOperationException)
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task DeleteAsync(Guid userId)
        {
            UserTable userTable = await userManager.FindByIdAsync(userId.ToString()) ?? throw new DatabaseOperationException();
            IdentityResult result = await userManager.DeleteAsync(userTable);
            if (!result.Succeeded)
            {
                throw new DatabaseOperationException();
            }
        }

        public async Task<UserEntity?> FindByEmailAsync(string email)
        {
            UserTable? userTable = await userManager.FindByEmailAsync(email);
            if (userTable is null)
            {
                return null;
            }
            else
            {
                return new UserEntity
                {
                    Id = new Guid(userTable.Id),
                    Email = email
                };
            }
        }

        public async Task<UserEntity?> FindByIdAsync(Guid id)
        {
            UserTable? userTable = await userManager.FindByIdAsync(id.ToString());
            if (userTable is null)
            {
                return null;
            }
            else
            {
                return new UserEntity
                {
                    Id = new Guid(userTable.Id),
                    Email = userTable.Email!
                };
            }
        }

        public async Task<IEnumerable<UserEntity>> GetAll()
        {
            return (
                from u in dbContext.Users
                select new UserEntity
                {
                    Id = new Guid(u.Id),
                    Email = u.Email!,
                    Roles = (
                        from ur in dbContext.UserRoles
                        join r in dbContext.Roles on ur.RoleId equals r.Id
                        where ur.UserId == u.Id
                        select r.Name
                    ).ToArray()
                }
            );
        }

        public async Task<IEnumerable<string>> GetRolesAsync(UserEntity user)
        {
            UserTable? userTable = await userManager.FindByEmailAsync(user.Email);
            return userTable is null ? [] : await userManager.GetRolesAsync(userTable);
        }

        public async Task UpdateRoles(UserEntity user, IEnumerable<string> rolesToAdd, IEnumerable<string> rolesToRemove)
        {
            using var transaction = await dbContext.Database.BeginTransactionAsync();

            try
            {
                UserTable userTable = await userManager.FindByEmailAsync(user.Email) ?? throw new DatabaseOperationException();

                if (rolesToAdd.Any())
                {
                    var addResult = await userManager.AddToRolesAsync(userTable, rolesToAdd);
                    if (!addResult.Succeeded)
                    {
                        throw new DatabaseOperationException();
                    }
                }

                if (rolesToRemove.Any())
                {
                    var removeResult = await userManager.RemoveFromRolesAsync(userTable, rolesToRemove);
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
