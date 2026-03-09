using PGRFacilAPI.Application.Shared;

namespace PGRFacilAPI.Application.Perigo.PerigoGetAll
{
    public record PerigoGetAllOutputDto(IEnumerable<PerigoDto> Perigos, bool HasMoreData) : GetAllOutputDto(HasMoreData);
}
