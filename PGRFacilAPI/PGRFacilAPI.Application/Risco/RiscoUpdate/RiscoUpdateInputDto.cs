using PGRFacilAPI.Domain.Enums;

namespace PGRFacilAPI.Application.Risco.RiscoUpdate
{
    public record RiscoUpdateInputDto(Guid GheId, Guid RiscoId, string Local, string Atividades, IEnumerable<Guid> PerigoIds, IEnumerable<Guid> DanoIds, AgentesDeRisco Agentes,
        string TipoDeAvaliacao, uint Severidade, uint Probabilidade);
}
