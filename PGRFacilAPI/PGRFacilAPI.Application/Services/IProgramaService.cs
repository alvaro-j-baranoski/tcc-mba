using PGRFacilAPI.Application.DTOs;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Services
{
    public interface IProgramaService
    {
        Task<ProgramaDTO> Create(CreateProgramaDTO createProgramaDTO, Usuario usuario);
    }
}
