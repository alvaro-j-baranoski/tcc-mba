using PGRFacilAPI.Domain.Enums;

namespace PGRFacilAPI.Application.Risco.RiscoUpdate
{
    public record RiscoUpdateInputDto(Guid GheId, Guid RiscoId, string Local, string Atividades, string Perigos, string Danos, AgentesDeRisco Agentes,
        string TipoDeAvaliacao, uint Severidade, uint Probabilidade);
}