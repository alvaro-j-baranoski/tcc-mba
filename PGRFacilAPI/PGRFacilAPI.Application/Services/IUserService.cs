using PGRFacilAPI.Application.DTOs.Users;
using PGRFacilAPI.Application.User.UserRegister;

namespace PGRFacilAPI.Application.Services
{
    public interface IUserService
    {
        /// <summary>
        /// Autentica um usuário baseado em suas credenciais.
        /// </summary>
        /// <remarks>Baseado em https://www.youtube.com/watch?v=-feKtsYWMy0&t=99s</remarks>
        Task<LoginResponseDTO> Login(LoginRequestDTO usuarioDTO);

        Task<IEnumerable<UserDTO>> GetAll();

        Task Update(Guid guid, UpdateUserDTO updateUserDTO);
        
        Task Delete(Guid guid);
    }
}
