namespace PGRFacilAPI.Application.Usuario.UsuarioUpdate
{
    public record UsuarioUpdateInputDto(Guid Id, IEnumerable<string> Permissoes);
}
