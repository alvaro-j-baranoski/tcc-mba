using PGRFacilAPI.Application.DTOs.Programs;
using PGRFacilAPI.Application.Enums;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Services
{
    public interface IProgramsService
    {
        Task<ProgramDTO> Create(CreateProgramDTO createProgramaDTO, User usuario);
        Task<ProgramDTO> GetByID(Guid guid, User usuario);
        Task<IEnumerable<ProgramDTO>> GetAll(User usuario);
        Task<ProgramDTO> Update(Guid guid, UpdateProgramDTO updateProgramaDTO, User usuario);
        Task Delete(Guid guid, User usuario);
        Task<StatusDoPrograma> VerificarStatusDoPrograma(User usuario, Guid guid);
        Task UpdateProgramaDate(Guid guid);
    }
}
