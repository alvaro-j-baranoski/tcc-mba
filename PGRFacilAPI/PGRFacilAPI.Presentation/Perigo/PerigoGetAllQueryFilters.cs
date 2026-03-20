using PGRFacilAPI.Application.Perigo.PerigoGetAll;

namespace PGRFacilAPI.Presentation.Perigo
{
    public record PerigoGetAllQueryFilters
    {
        public int Start { get; init; } = 0;
        public int Limit { get; init; } = 25;
        public string SortDirection { get; init; } = "asc";
        public string? Descricao { get; init; }

        public PerigoGetAllInputDto ToInputDto() => new PerigoGetAllInputDto
        {
            Descricao = Descricao,
            Start = Start,
            Limit = Limit,
            SortDirection = QueryParameterHelper.SerializeSortDirection(SortDirection)
        };
    }
}
