using PGRFacilAPI.Application.User;

namespace PGRFacilAPI.Presentation.Usuario
{
    public record UsuarioGetAllOutputRequest(IEnumerable<UsuarioOutputRequest> Usuarios);
}
