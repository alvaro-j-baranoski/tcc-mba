using PGRFacilAPI.Domain.Enums;

namespace PGRFacilAPI.Domain.Models
{
    public class Risco(
        string local,
        string atividades,
        string perigos,
        string danos,
        AgentesDeRisco agentesDeRisco,
        string tipoDeAvaliacao,
        uint severidade,
        uint probabilidade)
    {
        public Guid Guid { get; private set; } = Guid.NewGuid();
        public string Local { get; private set; } = local;
        public string Atividades { get; private set; } = atividades;
        public string Perigos { get; private set; } = perigos;
        public string Danos { get; private set; } = danos;
        public AgentesDeRisco AgentesDeRisco { get; private set; } = agentesDeRisco;
        public string TipoDeAvaliacao { get; private set; } = tipoDeAvaliacao;
        public uint Severidade { get; private set; } = severidade;
        public uint Probabilidade { get; private set; } = probabilidade;
    }
}
