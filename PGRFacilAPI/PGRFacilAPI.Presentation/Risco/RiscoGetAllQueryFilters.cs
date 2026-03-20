using PGRFacilAPI.Application.Risco.RiscoGetAll;

namespace PGRFacilAPI.Presentation.Risco
{
    public record RiscoGetAllQueryFilters
    {
        public int Start { get; init; } = 0;
        public int Limit { get; init; } = 25;
        public string SortDirection { get; init; } = "asc";
        public string? SortBy { get; init; }
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

        public RiscoGetAllInputDto ToInputDto(Guid? GheId) => new RiscoGetAllInputDto(GheId, Local,
            Atividades, Agentes, TipoDeAvaliacao, MinSeveridade, MaxSeveridade, Severidade, MinProbabilidade, 
            MaxProbabilidade, Probabilidade, MinSignificancia, MaxSignificancia, Significancia, NivelSignificancia, 
            Start, Limit, SortBy, QueryParameterHelper.SerializeSortDirection(SortDirection));
    }
}
