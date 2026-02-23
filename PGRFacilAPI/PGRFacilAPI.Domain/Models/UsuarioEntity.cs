namespace PGRFacilAPI.Domain.Models
{
    public class UsuarioEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Email { get; set; }
        public IEnumerable<string> Permissoes { get; set; } = [];
    }
}
