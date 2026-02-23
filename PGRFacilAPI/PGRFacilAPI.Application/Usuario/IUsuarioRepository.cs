using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Usuario
{
    public interface IUsuarioRepository
    {
        Task Create(UsuarioEntity user, string password);
        Task<IEnumerable<UsuarioEntity>> GetAll();
        Task UpdateRoles(UsuarioEntity user, IEnumerable<string> rolesToAdd, IEnumerable<string> rolesToRemove);

        Task<UsuarioEntity?> FindByEmailAsync(string email);
        Task<UsuarioEntity?> FindByIdAsync(Guid id);
        Task<bool> CheckPasswordAsync(UsuarioEntity user, string password);
        Task<IEnumerable<string>> GetRolesAsync(UsuarioEntity user);
        Task DeleteAsync(Guid userId);
    }
}
