namespace PGRFacilAPI.Domain.Models
{
    public class Programa(string nome)
    {
        public Guid Guid { get; private set; } = Guid.NewGuid();
        public string Nome { get; private set; } = nome;
        public DateTime DataDeCriacao { get; set; } = DateTime.Now;
        public ICollection<Risco> Riscos { get; set; } = [];
        public string? UsuarioID { get; set; }
        public Usuario? Usuario { get; set; }
    }
}
