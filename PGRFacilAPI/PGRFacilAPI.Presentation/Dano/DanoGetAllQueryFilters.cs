using PGRFacilAPI.Application.Dano.DanoGetAll;

namespace PGRFacilAPI.Presentation.Dano
{
    public record DanoGetAllQueryFilters
    {
        public int Start { get; init; } = 0;
        public int Limit { get; init; } = 25;
        public string SortDirection { get; init; } = "asc";
        public string? Descricao { get; init; }

        public DanoGetAllInputDto ToInputDto() => new DanoGetAllInputDto
        {
            Descricao = Descricao,
            Start = Start,
            Limit = Limit,
            SortDirection = QueryParameterHelper.SerializeSortDirection(SortDirection)
        };
    }
}
