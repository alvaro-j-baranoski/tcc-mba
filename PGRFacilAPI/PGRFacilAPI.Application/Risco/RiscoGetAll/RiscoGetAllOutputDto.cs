using PGRFacilAPI.Application.Shared;

namespace PGRFacilAPI.Application.Risco.RiscoGetAll
{
    public record RiscoGetAllOutputDto(IEnumerable<RiscoDto> Riscos, bool HasMoreData) : GetAllOutputDto(HasMoreData);
}
