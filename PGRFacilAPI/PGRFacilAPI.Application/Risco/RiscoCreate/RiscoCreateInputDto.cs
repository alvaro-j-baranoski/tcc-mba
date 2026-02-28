using PGRFacilAPI.Domain.Enums;

namespace PGRFacilAPI.Application.Risco.RiscoCreate
{
    public record RiscoCreateInputDto(Guid GheId, string Local, string Atividades, IEnumerable<Guid> PerigoIds, string Danos, AgentesDeRisco Agentes,
        string TipoDeAvaliacao, uint Severidade, uint Probabilidade);
}
