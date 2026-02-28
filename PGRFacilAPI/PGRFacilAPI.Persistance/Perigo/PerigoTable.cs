using PGRFacilAPI.Persistance.Risco;

namespace PGRFacilAPI.Persistance.Perigo
{
    public class PerigoTable
    {
        public required Guid Id { get; set; }
        public required string Descricao { get; set; }
        public ICollection<RiscoTable> Riscos { get; set; } = [];
    }
}
