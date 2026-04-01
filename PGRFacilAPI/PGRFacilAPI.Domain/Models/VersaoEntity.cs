namespace PGRFacilAPI.Domain.Models
{
    public class VersaoEntity
    {
        public int Id { get; set; }
        public Guid GheId { get; set; }
        public string Versao { get; set; } = string.Empty;
        public DateOnly DataCriacao { get; set; }
        public string? Observacoes { get; set; }
    }
}
