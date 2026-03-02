namespace PGRFacilAPI.Domain.Models
{
    public class DanoEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Descricao { get; set; }
    }
}
