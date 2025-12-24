using PGRFacilAPI.Application.DTOs;
using PGRFacilAPI.Application.Enums;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Services
{
    public interface IProgramaService
    {
        Task<ProgramaDTO> Create(CreateProgramaDTO createProgramaDTO, Usuario usuario);
        Task<ProgramaDTO> GetByID(Guid guid, Usuario usuario);
        Task<IEnumerable<ProgramaDTO>> GetAll(Usuario usuario);
        Task<ProgramaDTO> Update(Guid guid, UpdateProgramaDTO updateProgramaDTO, Usuario usuario);
        Task Delete(Guid guid, Usuario usuario);
        Task<StatusDoPrograma> VerificarStatusDoPrograma(Usuario usuario, Guid guid);
    }
}
