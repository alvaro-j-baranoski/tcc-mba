using PGRFacilAPI.Application.DTOs;

namespace PGRFacilAPI.Application.Services
{
    public interface IRiscoService
    {
        Task<RiscoDTO> Create(CreateRiscoDTO createRiscoDTO);

        Task<RiscoDTO> GetByGuid(Guid guid);
    }
}
