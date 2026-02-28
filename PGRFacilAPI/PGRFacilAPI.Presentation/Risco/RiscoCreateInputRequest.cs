using PGRFacilAPI.Domain.Enums;

namespace PGRFacilAPI.Presentation.Risco
{
    public record RiscoCreateInputRequest(string Local, string Atividades, IEnumerable<Guid> PerigoIds, string Danos, AgentesDeRisco Agentes,
        string TipoDeAvaliacao, uint Severidade, uint Probabilidade);
}
