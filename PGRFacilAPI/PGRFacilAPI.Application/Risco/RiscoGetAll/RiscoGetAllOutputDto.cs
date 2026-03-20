using PGRFacilAPI.Application.Shared;

namespace PGRFacilAPI.Application.Risco.RiscoGetAll
{
    public record RiscoGetAllOutputDto(IEnumerable<RiscoGetAllDto> Riscos, bool HasMoreData) : GetAllOutputDto(HasMoreData);
}
