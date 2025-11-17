using PGRFacilAPI.Application.DTOs;

namespace PGRFacilAPI.Application.Services
{
    public interface IRiscoService
    {
        RiscoDTO Create(CreateRiscoDTO createRiscoDTO);
    }
}
