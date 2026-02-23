namespace PGRFacilAPI.Presentation.Usuario
{
    public record UsuarioOutputRequest(Guid Id, string Email, IEnumerable<string> Permissoes);
}
