using PGRFacilAPI.Application.DTOs;
using PGRFacilAPI.Application.Models;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Services
{
    public interface IRiscoService
    {
        Task<RiscoDTO> Create(User usuarioID, Guid programaGuid, CreateRiscoDTO createRiscoDTO);
        Task<RiscoDTO> GetByID(User usuario, Guid programaGuid, Guid riscoGuid);
        Task<IEnumerable<RiscoDTO>> GetAll(User usuario, Guid programaGuid);
        Task<IEnumerable<SimplifiedRisco>> GetSimplifiedRiscos();
        Task<RiscoDTO> Update(User usuario, Guid programaGuid, Guid riscoGuid, UpdateRiscoDTO updateRiscoDTO);
        Task Delete(User usuario, Guid programaGuid, Guid riscoGuid);
    }
}
