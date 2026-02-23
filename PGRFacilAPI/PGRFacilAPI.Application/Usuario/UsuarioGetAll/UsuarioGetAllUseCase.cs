using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Usuario.UsuarioGetAll
{
    public class UsuarioGetAllUseCase(IUsuarioRepository userRepository)
    {
        public async Task<UsuarioGetAllOutputDto> Execute()
        {
            IEnumerable<UsuarioEntity> users = await userRepository.GetAll();
            IEnumerable<UsuarioDto> result = users.Select(u => new UsuarioDto(u.Id, u.Email, u.Permissoes));
            return new UsuarioGetAllOutputDto(result);
        }
    }
}
