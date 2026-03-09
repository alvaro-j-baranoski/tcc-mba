using PGRFacilAPI.Application.Shared;

namespace PGRFacilAPI.Application.Risco.RiscoGetAll
{
    public record RiscoGetAllInputDto(Guid GheId, string? Local, string? Atividades, string? Agentes, string? TipoDeAvaliacao, int? MinSeveridade,
        int? MaxSeveridade, int? Severidade, int? MinProbabilidade, int? MaxProbabilidade, int? Probabilidade, int? MinSignificancia,
        int? MaxSignificancia, int? Significancia, string? NivelSignificancia, int Start, int Limit, string SortBy, SortDirection SortDirection) :
        GetAllInputDto(Start, Limit, SortDirection);
}
