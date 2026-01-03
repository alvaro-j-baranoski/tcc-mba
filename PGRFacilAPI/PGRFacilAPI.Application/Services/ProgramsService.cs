using Microsoft.AspNetCore.Identity;
using PGRFacilAPI.Application.DTOs.Programs;
using PGRFacilAPI.Application.Enums;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Interfaces;
using PGRFacilAPI.Domain.Models;
using System.Security.Claims;

namespace PGRFacilAPI.Application.Services
{
    public class ProgramsService(IProgramsRepository programsRepository, UserManager<User> userManager) : IProgramsService
    {
        public async Task<ProgramDTO> Create(CreateProgramDTO createProgramDTO, ClaimsPrincipal userClaims)
        {
            User user = await userManager.GetUserAsync(userClaims) ?? throw new UserNotFoundException();
            Programa programaToCreate = MapToProgram(createProgramDTO, user.Id);
            Programa createdProgram = await programsRepository.Create(programaToCreate);
            return MapToProgramDTO(createdProgram);
        }

        public async Task<ProgramDTO> GetByID(Guid guid)
        {
            Programa? programa = await programsRepository.GetByID(guid) ?? throw new EntityNotFoundException();
            return MapToProgramDTO(programa);
        }

        public async Task<IEnumerable<ProgramDTO>> GetAll()
        {
            IEnumerable<Programa> programas = await programsRepository.GetAll();
            List<ProgramDTO> programasDTO = [];
            foreach (Programa programa in programas)
            {
                programasDTO.Add(MapToProgramDTO(programa));
            }
            return programasDTO;
        }

        public async Task<ProgramDTO> Update(Guid guid, UpdateProgramDTO updateProgramDTO, ClaimsPrincipal userClaims)
        {
            User user = await userManager.GetUserAsync(userClaims) ?? throw new UserNotFoundException();
            Programa programToUpdate = MapToProgram(updateProgramDTO, user.Id);
            Programa updatedProgram = await programsRepository.Update(guid, programToUpdate, user.Id);
            return MapToProgramDTO(updatedProgram);
        }

        public async Task Delete(Guid guid)
        {
            await programsRepository.Delete(guid);
        }

        private static Programa MapToProgram(CreateProgramDTO programDTO, string userId)
        {
            return new Programa
            {
                Nome = programDTO.Name,
                UsuarioID = userId,
                AtualizadoEm = DateTime.UtcNow
            };
        }

        private static Programa MapToProgram(UpdateProgramDTO programDTO, string userId)
        {
            return new Programa
            {
                Nome = programDTO.Name,
                UsuarioID = userId,
                AtualizadoEm = DateTime.UtcNow
            };
        }

        private static ProgramDTO MapToProgramDTO(Programa program)
        {
            return new ProgramDTO
            {
                Guid = program.Guid,
                Name = program.Nome,
                UpdatedOn = program.AtualizadoEm,
                NumberOfRisks = program.NumeroDeRiscos
            };
        }

        public async Task<ProgramStatus> CheckProgramStatus(User usuario, Guid guid)
        {
            Programa? program = await programsRepository.GetByID(guid);

            if (program is null)
            {
                return ProgramStatus.DoesNotExist;
            }
            else if (program.UsuarioID != usuario.Id)
            {
                return ProgramStatus.ExistsButNoPermission;
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
