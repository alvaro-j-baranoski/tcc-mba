using PGRFacilAPI.Application.DTOs;
using PGRFacilAPI.Application.Interfaces;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Services
{
    public class ProgramaService(IProgramaRepository programaRepository) : IProgramaService
    {
        public async Task<ProgramaDTO> Create(CreateProgramaDTO createProgramaDTO, Usuario usuario)
        {
            Programa programaToCreate = MapToPrograma(createProgramaDTO, usuario.Id);
            Programa programaCriado = await programaRepository.Create(programaToCreate);
            return MapToProgramaDTO(programaCriado);
        }

        private static Programa MapToPrograma(CreateProgramaDTO programaDTO, string usuarioID)
        {
            return new Programa
            {
                Nome = programaDTO.Nome,
                UsuarioID = usuarioID
            };
        }

        private static ProgramaDTO MapToProgramaDTO(Programa programa)
        {
            return new ProgramaDTO
            {
                Guid = programa.Guid,
            };
        }
    }
}
