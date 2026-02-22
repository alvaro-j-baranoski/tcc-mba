using PGRFacilAPI.Domain.Enums;

namespace PGRFacilAPI.Application.Risco.RiscoCreate
{
    public record RiscoCreateInputDto(Guid GheId, string Local, string Atividades, string Perigos, string Danos, AgentesDeRisco Agentes,
        string TipoDeAvaliacao, uint Severidade, uint Probabilidade);
}
