namespace PGRFacilAPI.Domain.Models
{
    public class GheEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Nome { get; set; }
        public DateTime AtualizadoEm { get; set; }
        public IEnumerable<RiscoEntity> Riscos { get; set; } = [];
        public int NumeroDeRiscos => Riscos.ToArray().Length;
        public Version Versao { get; set; } = new Version();
    }
}
