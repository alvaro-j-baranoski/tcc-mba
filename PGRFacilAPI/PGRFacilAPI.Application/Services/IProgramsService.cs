using PGRFacilAPI.Application.DTOs.Programs;
using PGRFacilAPI.Application.Enums;
using PGRFacilAPI.Domain.Models;
using System.Security.Claims;

namespace PGRFacilAPI.Application.Services
{
    public interface IProgramsService
    {
        Task<ProgramDTO> Create(CreateProgramDTO createProgramaDTO, ClaimsPrincipal userClaims);
        Task<ProgramDTO> GetByID(Guid guid);
        Task<IEnumerable<ProgramDTO>> GetAll();
        Task<ProgramDTO> Update(Guid guid, UpdateProgramDTO updateProgramDTO, ClaimsPrincipal userClaims);
        Task Delete(Guid guid);
        Task<ProgramStatus> CheckProgramStatus(User usuario, Guid guid);
        Task UpdateProgramDate(Guid guid);
    }
}
