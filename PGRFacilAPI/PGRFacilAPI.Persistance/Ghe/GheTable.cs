using PGRFacilAPI.Persistance.Risco;

namespace PGRFacilAPI.Persistance.Ghe
{
    public class GheTable
    {
        public Guid Id { get; set; }
        public required string Nome { get; set; }
        public DateTime AtualizadoEm { get; set; }
        public ICollection<RiscoTable> Riscos { get; set; } = [];
    }
}
