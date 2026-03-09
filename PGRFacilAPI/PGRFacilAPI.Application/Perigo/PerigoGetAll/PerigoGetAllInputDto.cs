using PGRFacilAPI.Application.Shared;

namespace PGRFacilAPI.Application.Perigo.PerigoGetAll
{
    public record PerigoGetAllInputDto(string? Descricao, int Start, int Limit, SortDirection SortDirection) : GetAllInputDto(Start, Limit, SortDirection);
}
