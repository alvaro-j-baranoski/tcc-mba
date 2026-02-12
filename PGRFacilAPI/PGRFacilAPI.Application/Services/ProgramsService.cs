using Microsoft.AspNetCore.Identity;
using PGRFacilAPI.Application.DTOs.Programs;
using PGRFacilAPI.Application.Enums;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Ghe;
using PGRFacilAPI.Domain.Models;
using System.Security.Claims;

namespace PGRFacilAPI.Application.Services
{
    public class ProgramsService(IGheRepository programsRepository) : IProgramsService
    {
        public async Task<ProgramDTO> Create(CreateProgramDTO createProgramDTO, ClaimsPrincipal userClaims)
        {
            GheEntity programaToCreate = MapToProgram(createProgramDTO);
            GheEntity createdProgram = await programsRepository.Create(programaToCreate);
            return MapToProgramDTO(createdProgram);
        }

        public async Task<ProgramDTO> GetByID(Guid guid)
        {
            GheEntity? programa = await programsRepository.GetById(guid) ?? throw new EntityNotFoundException();
            return MapToProgramDTO(programa);
        }

        public async Task<IEnumerable<ProgramDTO>> GetAll()
        {
            IEnumerable<GheEntity> programas = await programsRepository.GetAll();
            List<ProgramDTO> programasDTO = [];
            foreach (GheEntity programa in programas)
            {
                programasDTO.Add(MapToProgramDTO(programa));
            }
            return programasDTO;
        }

        public async Task<ProgramDTO> Update(Guid guid, UpdateProgramDTO updateProgramDTO, ClaimsPrincipal userClaims)
        {
            GheEntity programToUpdate = MapToProgram(updateProgramDTO);
            GheEntity updatedProgram = await programsRepository.Update(guid, programToUpdate);
            return MapToProgramDTO(updatedProgram);
        }

        public async Task Delete(Guid guid)
        {
            await programsRepository.Delete(guid);
        }

        private static GheEntity MapToProgram(CreateProgramDTO programDTO)
        {
            return new GheEntity
            {
                Nome = programDTO.Name,
                AtualizadoEm = DateTime.UtcNow
            };
        }

        private static GheEntity MapToProgram(UpdateProgramDTO programDTO)
        {
            return new GheEntity
            {
                Nome = programDTO.Name,
                AtualizadoEm = DateTime.UtcNow
            };
        }

        private static ProgramDTO MapToProgramDTO(GheEntity program)
        {
            return new ProgramDTO
            {
                Guid = program.Id,
                Name = program.Nome,
                UpdatedOn = program.AtualizadoEm
            };
        }

        public async Task<ProgramStatus> CheckProgramStatus(UserEntity usuario, Guid guid)
        {
            GheEntity? program = await programsRepository.GetById(guid);

            if (program is null)
            {
                return ProgramStatus.DoesNotExist;
            }
            else
            {
                return ProgramStatus.Exists;
            }
        }

        public async Task UpdateProgramDate(Guid guid)
        {
            await programsRepository.UpdateDateTime(guid, DateTime.UtcNow);
        }
    }
}
