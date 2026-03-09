using PGRFacilAPI.Application.Shared;

namespace PGRFacilAPI.Application.Dano.DanoGetAll
{
    public record DanoGetAllInputDto(string? Descricao, int Start, int Limit, SortDirection SortDirection) : GetAllInputDto(Start, Limit, SortDirection);
}
