using PGRFacilAPI.Persistance.Risco;

namespace PGRFacilAPI.Persistance.PlanoDeAcao
{
    public class PlanoDeAcaoTable
    {
        public required Guid Id { get; set; }
        public required string Responsavel { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataConclusao { get; set; }
        public required string Descricao { get; set; }

        public required Guid RiscoId { get; set; }
        public required RiscoTable Risco { get; set; }
    }
}
