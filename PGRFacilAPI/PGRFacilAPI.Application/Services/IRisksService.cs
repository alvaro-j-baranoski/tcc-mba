using PGRFacilAPI.Application.DTOs.Risks;
using PGRFacilAPI.Application.Models;
using System.Security.Claims;

namespace PGRFacilAPI.Application.Services
{
    public interface IRisksService
    {
        Task<RiskDTO> Create(ClaimsPrincipal userClaims, Guid programGuid, CreateRiskDTO createRiscoDTO);
        Task<RiskDTO> GetByID(Guid programGuid, Guid riskGuid);
        Task<IEnumerable<RiskDTO>> GetAll(Guid programGuid);
        Task<IEnumerable<SimplifiedRisk>> GetSimplifiedRisk();
        Task<RiskDTO> Update(ClaimsPrincipal userClaims, Guid programGuid, Guid riskGuid, UpdateRiskDTO updateRiskDTO);
        Task Delete(Guid programGuid, Guid riskGuid);
    }
}
