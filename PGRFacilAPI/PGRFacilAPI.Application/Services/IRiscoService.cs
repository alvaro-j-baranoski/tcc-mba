using PGRFacilAPI.Application.DTOs;
using PGRFacilAPI.Application.Models;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Services
{
    public interface IRiscoService
    {
        Task<RiscoDTO> Create(Usuario usuarioID, Guid programaGuid, CreateRiscoDTO createRiscoDTO);
        Task<RiscoDTO> GetByID(Usuario usuario, Guid programaGuid, Guid riscoGuid);
        Task<IEnumerable<RiscoDTO>> GetAll(Usuario usuario, Guid programaGuid);
        Task<IEnumerable<SimplifiedRisco>> GetSimplifiedRiscos();
        Task<RiscoDTO> Update(Usuario usuario, Guid programaGuid, Guid riscoGuid, UpdateRiscoDTO updateRiscoDTO);
        Task Delete(Usuario usuario, Guid programaGuid, Guid riscoGuid);
    }
}
