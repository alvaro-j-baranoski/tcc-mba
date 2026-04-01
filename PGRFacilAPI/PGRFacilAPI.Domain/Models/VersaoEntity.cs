namespace PGRFacilAPI.Domain.Models
{
    public class VersaoEntity
    {
        public int Id { get; set; }
        public Guid GheId { get; set; }
        public DateOnly DataCriacao { get; set; }
        public string? Observacoes { get; set; }
    }
}
