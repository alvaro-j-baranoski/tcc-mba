using Microsoft.AspNetCore.Identity;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Usuario;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Persistance.Usuario
{
    public class UsuarioRepository(AppDbContext dbContext, UserManager<UsuarioTable> userManager) : IUsuarioRepository
    {
        public async Task<bool> CheckPasswordAsync(UsuarioEntity user, string password)
        {
            UsuarioTable? userTable = await userManager.FindByEmailAsync(user.Email);
            return userTable is not null && await userManager.CheckPasswordAsync(userTable, password);
        }

        public async Task Create(UsuarioEntity user, string password)
        {
            using var transaction = await dbContext.Database.BeginTransactionAsync();

            try
            {
                var userTable = new UsuarioTable { Email = user.Email, UserName = user.Email };
                IdentityResult identityResult = await userManager.CreateAsync(userTable, password);

                if (!identityResult.Succeeded)
                {
                    throw new DatabaseOperationException();
                }

                IdentityResult identityRoleResult = await userManager.AddToRoleAsync(userTable, Permissoes.Reader);

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

        public async Task DeleteAsync(Guid userId)
        {
            UsuarioTable userTable = await userManager.FindByIdAsync(userId.ToString()) ?? throw new UserNotFoundException();
            IdentityResult result = await userManager.DeleteAsync(userTable);
            if (!result.Succeeded)
            {
                throw new DatabaseOperationException();
            }
        }

        public async Task<UsuarioEntity?> FindByEmailAsync(string email)
        {
            UsuarioTable? userTable = await userManager.FindByEmailAsync(email);
            if (userTable is null)
            {
                return null;
            }
            else
            {
                return new UsuarioEntity
                {
                    Id = new Guid(userTable.Id),
                    Email = email
                };
            }
        }

        public async Task<UsuarioEntity?> FindByIdAsync(Guid id)
        {
            UsuarioTable? userTable = await userManager.FindByIdAsync(id.ToString());
            if (userTable is null)
            {
                return null;
            }
            else
            {
                return new UsuarioEntity
                {
                    Id = new Guid(userTable.Id),
                    Email = userTable.Email!
                };
            }
        }

        public async Task<IEnumerable<UsuarioEntity>> GetAll()
        {
            return (
                from u in dbContext.Users
                select new UsuarioEntity
                {
                    Id = new Guid(u.Id),
                    Email = u.Email!,
                    Permissoes = (
                        from ur in dbContext.UserRoles
                        join r in dbContext.Roles on ur.RoleId equals r.Id
                        where ur.UserId == u.Id
                        select r.Name
                    ).ToArray()
                }
            );
        }

        public async Task<IEnumerable<string>> GetRolesAsync(UsuarioEntity user)
        {
            UsuarioTable? userTable = await userManager.FindByEmailAsync(user.Email);
            return userTable is null ? [] : await userManager.GetRolesAsync(userTable);
        }

        public async Task UpdateRoles(UsuarioEntity user, IEnumerable<string> rolesToAdd, IEnumerable<string> rolesToRemove)
        {
            using var transaction = await dbContext.Database.BeginTransactionAsync();

            try
            {
                UsuarioTable userTable = await userManager.FindByEmailAsync(user.Email) ?? throw new DatabaseOperationException();

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
