namespace PGRFacilAPI.Domain.Models
{
    public class PlanoDeAcaoEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Responsavel { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataConclusao { get; set; }
        public required string Descricao { get; set; }
    }
}
