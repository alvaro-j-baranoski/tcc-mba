using PGRFacilAPI.Application.Shared;

namespace PGRFacilAPI.Application.Dano.DanoGetAll
{
    public record DanoGetAllOutputDto(IEnumerable<DanoDto> Danos, bool HasMoreData) : GetAllOutputDto(HasMoreData);
}
