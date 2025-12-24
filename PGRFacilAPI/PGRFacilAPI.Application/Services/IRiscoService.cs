using PGRFacilAPI.Application.DTOs;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Services
{
    public interface IRiscoService
    {
        Task<RiscoDTO> Create(Usuario usuarioID, Guid programaGuid, CreateRiscoDTO createRiscoDTO);

        Task<RiscoDTO> GetByGuid(Guid guid);
    }
}
