using PGRFacilAPI.Domain.Enums;

namespace PGRFacilAPI.Application.Risco.RiscoGetAll
{
    public record RiscoGetAllFilterParameters(string? Local, string? Atividades, AgentesDeRisco? Agentes, string? TipoDeAvaliacao, int? MinSeveridade,
        int? MaxSeveridade, int? Severidade, int? MinProbabilidade, int? MaxProbabilidade, int? Probabilidade, int? MinSignificancia,
        int? MaxSignificancia, int? Significancia, NivelSignificancia? NivelSignificancia);
}
