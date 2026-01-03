using PGRFacilAPI.Application.DTOs;
using PGRFacilAPI.Application.Enums;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Interfaces;
using PGRFacilAPI.Application.Models;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Services
{
    public class RiscoService(IProgramsService programaService, IRiscoRepository riscoRepository) : IRiscoService
    {
        public async Task<RiscoDTO> Create(User usuario, Guid programaGuid, CreateRiscoDTO createRiscoDTO)
        {
            await VerificarStatusDoPrograma(usuario, programaGuid);
            Risco riscoToCreate = MapToRisco(createRiscoDTO, programaGuid);
            Risco createdRisco = await riscoRepository.Create(riscoToCreate);
            await programaService.UpdateProgramDate(programaGuid);
            return MapToRiscoDTO(createdRisco);
        }

        public async Task<RiscoDTO> GetByID(User usuario, Guid programaGuid, Guid riscoGuid)
        {
            await VerificarStatusDoPrograma(usuario, programaGuid);
            Risco risco = await riscoRepository.GetByID(programaGuid, riscoGuid);
            return MapToRiscoDTO(risco);
        }

        public async Task<IEnumerable<RiscoDTO>> GetAll(User usuario, Guid programaGuid)
        {
            await VerificarStatusDoPrograma(usuario, programaGuid);
            IEnumerable<Risco> riscos = await riscoRepository.GetAll(programaGuid);
            List<RiscoDTO> riscosDTO = [];
            foreach (var risco in riscos)
            {
                riscosDTO.Add(MapToRiscoDTO(risco));
            }
            return riscosDTO;
        }

        public async Task<RiscoDTO> Update(User usuario, Guid programaGuid, Guid riscoGuid, UpdateRiscoDTO updateRiscoDTO)
        {
            await VerificarStatusDoPrograma(usuario, programaGuid);
            Risco riscoParaAtualizar = MapToRisco(updateRiscoDTO, programaGuid, riscoGuid);
            Risco riscoAtualizado = await riscoRepository.Update(riscoParaAtualizar);
            await programaService.UpdateProgramDate(programaGuid);
            return MapToRiscoDTO(riscoAtualizado);
        }

        public async Task Delete(User usuario, Guid programaGuid, Guid riscoGuid)
        {
            await VerificarStatusDoPrograma(usuario, programaGuid);
            await riscoRepository.Delete(riscoGuid);
            await programaService.UpdateProgramDate(programaGuid);
        }

        private async Task VerificarStatusDoPrograma(User usuario, Guid programaGuid)
        {
            ProgramStatus statusDoPrograma = await programaService.CheckProgramStatus(usuario, programaGuid);
            switch (statusDoPrograma)
            {
                case ProgramStatus.DoesNotExist:
                    throw new EntityNotFoundException();
                case ProgramStatus.ExistsButNoPermission:
                    throw new UserForbiddenException();
                default:
                    break;
            }
        }

        private static Risco MapToRisco(CreateRiscoDTO createRiscoDTO, Guid programaID)
        {
            return new Risco
            {
                Local = createRiscoDTO.Local,
                Atividades = createRiscoDTO.Atividades,
                Perigos = createRiscoDTO.Perigos,
                Danos = createRiscoDTO.Danos,
                AgentesDeRisco = createRiscoDTO.AgentesDeRisco,
                TipoDeAvaliacao = createRiscoDTO.TipoDeAvaliacao,
                Severidade = createRiscoDTO.Severidade,
                Probabilidade = createRiscoDTO.Probabilidade,
                ProgramaID = programaID
            };
        }

        private static Risco MapToRisco(UpdateRiscoDTO updateRiscoDTO, Guid programaID, Guid riscoGuid)
        {
            return new Risco
            {
                Guid = riscoGuid,
                Local = updateRiscoDTO.Local,
                Atividades = updateRiscoDTO.Atividades,
                Perigos = updateRiscoDTO.Perigos,
                Danos = updateRiscoDTO.Danos,
                AgentesDeRisco = updateRiscoDTO.AgentesDeRisco,
                TipoDeAvaliacao = updateRiscoDTO.TipoDeAvaliacao,
                Severidade = updateRiscoDTO.Severidade,
                Probabilidade = updateRiscoDTO.Probabilidade,
                ProgramaID = programaID
            };
        }

        private static RiscoDTO MapToRiscoDTO(Risco risco)
        {
            return new RiscoDTO
            {
                Guid = risco.Guid,
                Local = risco.Local,
                Atividades = risco.Atividades,
                Perigos = risco.Perigos,
                Danos = risco.Danos,
                AgentesDeRisco = risco.AgentesDeRisco,
                TipoDeAvaliacao = risco.TipoDeAvaliacao,
                Severidade = risco.Severidade,
                Probabilidade = risco.Probabilidade,
                Significancia = risco.Significancia,
                NivelSignificancia = risco.NivelSignificancia
            };
        }

        public async Task<IEnumerable<SimplifiedRisco>> GetSimplifiedRiscos()
        {
            return await riscoRepository.GetSimplifiedRiscos();
        }
    }
}
