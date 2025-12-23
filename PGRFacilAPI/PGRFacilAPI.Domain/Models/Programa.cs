namespace PGRFacilAPI.Domain.Models
{
    public class Programa
    {
        public Guid Guid { get; private set; } = Guid.NewGuid();
        public required string Nome { get; set; }
        public DateTime DataDeCriacao { get; private set; } = DateTime.UtcNow;
        public ICollection<Risco> Riscos { get; set; } = [];
        public string? UsuarioID { get; set; }
        public Usuario? Usuario { get; set; }
    }
}
