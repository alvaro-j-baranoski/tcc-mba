using PGRFacilAPI.Application.DTOs.Programs;
using PGRFacilAPI.Application.Enums;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Interfaces;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Services
{
    public class ProgramsService(IProgramaRepository programaRepository) : IProgramsService
    {
        public async Task<ProgramDTO> Create(CreateProgramDTO createProgramaDTO, User usuario)
        {
            Programa programaToCreate = MapToPrograma(createProgramaDTO, usuario.Id);
            Programa programaCriado = await programaRepository.Create(programaToCreate);
            return MapToProgramaDTO(programaCriado);
        }

        public async Task<ProgramDTO> GetByID(Guid guid, User usuario)
        {
            Programa? programa = await programaRepository.GetByID(guid, usuario.Id) ?? throw new EntityNotFoundException();
            return MapToProgramaDTO(programa);
        }

        public async Task<IEnumerable<ProgramDTO>> GetAll(User usuario)
        {
            IEnumerable<Programa> programas = await programaRepository.GetAll(usuario.Id);
            List<ProgramDTO> programasDTO = [];
            foreach (Programa programa in programas)
            {
                programasDTO.Add(MapToProgramaDTO(programa));
            }
            return programasDTO;
        }

        public async Task<ProgramDTO> Update(Guid guid, UpdateProgramDTO updateProgramaDTO, User usuario)
        {
            Programa programaParaAtualizar = MapToPrograma(updateProgramaDTO, usuario.Id);
            Programa programaAtualizado = await programaRepository.Update(guid, programaParaAtualizar, usuario.Id);
            return MapToProgramaDTO(programaAtualizado);
        }

        public async Task Delete(Guid guid, User usuario)
        {
            await programaRepository.Delete(guid, usuario.Id);
        }

        private static Programa MapToPrograma(CreateProgramDTO programaDTO, string usuarioID)
        {
            return new Programa
            {
                Nome = programaDTO.Name,
                UsuarioID = usuarioID,
                AtualizadoEm = DateTime.UtcNow
            };
        }

        private static Programa MapToPrograma(UpdateProgramDTO programaDTO, string usuarioID)
        {
            return new Programa
            {
                Nome = programaDTO.Nome,
                UsuarioID = usuarioID,
                AtualizadoEm = DateTime.UtcNow
            };
        }

        private static ProgramDTO MapToProgramaDTO(Programa programa)
        {
            return new ProgramDTO
            {
                Guid = programa.Guid,
                Name = programa.Nome,
                UpdatedOn = programa.AtualizadoEm,
                NumberOfRisks = programa.NumeroDeRiscos
            };
        }

        public async Task<StatusDoPrograma> VerificarStatusDoPrograma(User usuario, Guid guid)
        {
            Programa? programa = await programaRepository.GetByID(guid);

            if (programa is null) 
            {
                return StatusDoPrograma.NaoExiste;
            }
            else if (programa.UsuarioID != usuario.Id)
            {
                return StatusDoPrograma.ExisteMasSemPermissao;
            }
            else
            {
                return StatusDoPrograma.Existe;
            }
        }

        public async Task UpdateProgramaDate(Guid guid)
        {
            await programaRepository.UpdateDateTime(guid, DateTime.UtcNow);
        }
    }
}
