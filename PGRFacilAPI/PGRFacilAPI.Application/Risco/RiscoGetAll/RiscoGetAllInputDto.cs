using PGRFacilAPI.Application.Shared;
using PGRFacilAPI.Domain.Enums;
using System.Reflection;

namespace PGRFacilAPI.Application.Risco.RiscoGetAll
{
    public record RiscoGetAllInputDto : GetAllInputDto
    {
        public Guid? GheId { get; init; }
        public string? Local { get; init; }
        public string? Atividades { get; init; }
        public string? Agentes { get; init; }
        public string? TipoDeAvaliacao { get; init; }
        public int? MinSeveridade { get; init; }
        public int? MaxSeveridade { get; init; }
        public int? Severidade { get; init; }
        public int? MinProbabilidade { get; init; }
        public int? MaxProbabilidade { get; init; }
        public int? Probabilidade { get; init; }
        public int? MinSignificancia { get; init; }
        public int? MaxSignificancia { get; init; }
        public int? Significancia { get; init; }
        public string? NivelSignificancia { get; init; }
        public string? SortBy { get; init; }

        public RiscoGetAllQueryParameters GetQueryParameters(PropertyInfo? sortBy) => new(Start, Limit, SortDirection, sortBy);

        public RiscoGetAllFilterParameters GetFilterParameters(AgentesDeRisco? agentes, NivelSignificancia? nivelSignificancia) => 
            new(Local, Atividades, agentes, TipoDeAvaliacao, MinSeveridade, MaxSeveridade, Severidade, MinProbabilidade, MaxProbabilidade, 
                Probabilidade, MinSignificancia, MaxSignificancia, Significancia, nivelSignificancia);
    }
}
