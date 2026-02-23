namespace PGRFacilAPI.Presentation.Usuario
{
    public record UsuarioLoginOutputRequest(string Email, string Token, IEnumerable<string> Permissoes);
}
