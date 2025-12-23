using PGRFacilAPI.Application.DTOs;
using PGRFacilAPI.Application.Exceptions;
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

        public async Task<ProgramaDTO> GetByID(Guid guid, Usuario usuario)
        {
            Programa? programa = await programaRepository.GetByID(guid, usuario.Id) ?? throw new EntityNotFoundException();
            return MapToProgramaDTO(programa);
        }

        public async Task<IEnumerable<ProgramaDTO>> GetAll(Usuario usuario)
        {
            IEnumerable<Programa> programas = await programaRepository.GetAll(usuario.Id);
            List<ProgramaDTO> programasDTO = [];
            foreach (Programa programa in programas)
            {
                programasDTO.Add(MapToProgramaDTO(programa));
            }
            return programasDTO;
        }

        public async Task<ProgramaDTO> Update(Guid guid, UpdateProgramaDTO updateProgramaDTO, Usuario usuario)
        {
            Programa programaParaAtualizar = MapToPrograma(updateProgramaDTO, usuario.Id);
            Programa programaAtualizado = await programaRepository.Update(guid, programaParaAtualizar, usuario.Id);
            return MapToProgramaDTO(programaAtualizado);
        }

        public async Task Delete(Guid guid, Usuario usuario)
        {
            await programaRepository.Delete(guid, usuario.Id);
        }

        private static Programa MapToPrograma(CreateProgramaDTO programaDTO, string usuarioID)
        {
            return new Programa
            {
                Nome = programaDTO.Nome,
                UsuarioID = usuarioID
            };
        }

        private static Programa MapToPrograma(UpdateProgramaDTO programaDTO, string usuarioID)
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
                Nome = programa.Nome
            };
        }
    }
}
