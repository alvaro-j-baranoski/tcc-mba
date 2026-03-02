using PGRFacilAPI.Domain.Enums;
using PGRFacilAPI.Persistance.Dano;
using PGRFacilAPI.Persistance.Ghe;
using PGRFacilAPI.Persistance.Perigo;

namespace PGRFacilAPI.Persistance.Risco
{
    public class RiscoTable
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Local { get; set; } = string.Empty;
        public string Atividades { get; set; } = string.Empty;
        public AgentesDeRisco Agentes { get; set; }
        public string TipoDeAvaliacao { get; set; } = string.Empty;
        public uint Severidade { get; set; }
        public uint Probabilidade { get; set; }
        public Guid GheId { get; set; }
        public GheTable? Ghe { get; set; }
        public ICollection<PerigoTable> Perigos { get; set; } = [];
        public ICollection<DanoTable> Danos { get; set; } = [];
    }
}
