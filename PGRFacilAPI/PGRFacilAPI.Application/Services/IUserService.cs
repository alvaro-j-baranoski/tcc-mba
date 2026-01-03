using PGRFacilAPI.Application.DTOs.Users;

namespace PGRFacilAPI.Application.Services
{
    public interface IUserService
    {
        /// <summary>
        /// Registra um novo usuário baseado nas credenciais providenciadas.
        /// </summary>
        /// <remarks>Baseado em https://www.youtube.com/watch?v=-feKtsYWMy0&t=99s</remarks>
        Task Register(CreateUserDTO createUsuarioDTO);

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
