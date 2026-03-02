using PGRFacilAPI.Domain.Enums;

namespace PGRFacilAPI.Presentation.Risco
{
    public record RiscoUpdateInputRequest(string Local, string Atividades, IEnumerable<Guid> PerigoIds, IEnumerable<Guid> DanoIds, AgentesDeRisco Agentes,
        string TipoDeAvaliacao, uint Severidade, uint Probabilidade);
}
