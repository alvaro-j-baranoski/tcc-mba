using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Usuario.UsuarioRegister
{
    public class UsuarioRegisterUseCase(IUsuarioRepository userRepository)
    {
        /// <summary>
        /// Registers a new user.
        /// </summary>
        /// <exception cref="DatabaseOperationException"/>
        public async Task Execute(UsuarioRegisterInputDto input)
        {
            var user = new UserEntity { Email = input.Email };
            await userRepository.Create(user, input.Senha);
        }
    }
}
