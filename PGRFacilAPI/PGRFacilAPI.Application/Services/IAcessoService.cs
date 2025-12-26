using PGRFacilAPI.Application.DTOs;

namespace PGRFacilAPI.Application.Services
{
    public interface IAcessoService
    {
        /// <summary>
        /// Registra um novo usuário baseado nas credenciais providenciadas.
        /// </summary>
        /// <remarks>Baseado em https://www.youtube.com/watch?v=-feKtsYWMy0&t=99s</remarks>
        Task RegistrarUsuario(CreateUsuarioDTO createUsuarioDTO);

        /// <summary>
        /// Autentica um usuário baseado em suas credenciais.
        /// </summary>
        /// <returns>O JWT gerado a para ser usado no header de requisições futuras.</returns>
        /// <remarks>Baseado em https://www.youtube.com/watch?v=-feKtsYWMy0&t=99s</remarks>
        Task<string> Login(UsuarioDTO usuarioDTO);
    }
}
