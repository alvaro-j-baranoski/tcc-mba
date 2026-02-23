namespace PGRFacilAPI.Application.Usuario
{
    public record UsuarioDto(Guid Id, string Email, IEnumerable<string> Permissoes);
}
