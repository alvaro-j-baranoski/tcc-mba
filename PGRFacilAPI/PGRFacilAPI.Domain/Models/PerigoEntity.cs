namespace PGRFacilAPI.Domain.Models
{
    public class PerigoEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Descricao { get; set; }
    }
}
