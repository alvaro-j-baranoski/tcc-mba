using PGRFacilAPI.Persistance.Risco;

namespace PGRFacilAPI.Persistance.Dano
{
    public class DanoTable
    {
        public required Guid Id { get; set; }
        public required string Descricao { get; set; }
        public ICollection<RiscoTable> Riscos { get; set; } = [];
    }
}
