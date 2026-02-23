using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Usuario.UsuarioUpdate
{
    public class UsuarioUpdateUseCase(IUsuarioRepository userRepository)
    {
        public async Task Execute(UsuarioUpdateInputDto input)
        {
            UsuarioEntity? user = await userRepository.FindByIdAsync(input.Id) ?? throw new UserNotFoundException();
            var currentUserRoles = await userRepository.GetRolesAsync(user);
            var rolesToAdd = input.Permissoes.Except(currentUserRoles);
            var rolesToRemove = currentUserRoles.Except(input.Permissoes);
            await userRepository.UpdateRoles(user, rolesToAdd, rolesToRemove);
        }
    }
}
