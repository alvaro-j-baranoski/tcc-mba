using PGRFacilAPI.Persistance.Ghe;

namespace PGRFacilAPI.Persistance.Versao
{
    public class VersaoTable
    {
        public int Id { get; set; }
        public string Versao { get; set; } = string.Empty;
        public DateOnly DataCriacao { get; set; }
        public string? Observacoes { get; set; }
        public Guid GheId { get; set; }
        public required GheTable Ghe { get; set; }
    }
}
