namespace PGRFacilAPI.Application.Usuario.UsuarioLogin
{
    public record UsuarioLoginOutputDto(string Email, string Token, IEnumerable<string> Permissoes);
}
