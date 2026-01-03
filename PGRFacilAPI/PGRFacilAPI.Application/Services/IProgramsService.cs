using PGRFacilAPI.Application.DTOs;
using PGRFacilAPI.Application.Enums;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Services
{
    public interface IProgramsService
    {
        Task<ProgramaDTO> Create(CreateProgramaDTO createProgramaDTO, User usuario);
        Task<ProgramaDTO> GetByID(Guid guid, User usuario);
        Task<IEnumerable<ProgramaDTO>> GetAll(User usuario);
        Task<ProgramaDTO> Update(Guid guid, UpdateProgramaDTO updateProgramaDTO, User usuario);
        Task Delete(Guid guid, User usuario);
        Task<StatusDoPrograma> VerificarStatusDoPrograma(User usuario, Guid guid);
        Task UpdateProgramaDate(Guid guid);
    }
}
