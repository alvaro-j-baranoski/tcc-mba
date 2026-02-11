using PGRFacilAPI.Domain.Enums;
using PGRFacilAPI.Domain.Models;
using PGRFacilAPI.Persistance.Ghe;

namespace PGRFacilAPI.Persistance.Risco
{
    public class RiscoTable
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Local { get; set; } = string.Empty;
        public string Atividades { get; set; } = string.Empty;
        public string Perigos { get; set; } = string.Empty;
        public string Danos { get; set; } = string.Empty;
        public AgentesDeRisco Agentes { get; set; }
        public string TipoDeAvaliacao { get; set; } = string.Empty;
        public uint Severidade { get; set; }
        public uint Probabilidade { get; set; }
        public Guid GheId { get; set; }
        public GheTable? Ghe { get; set; }
    }
}
