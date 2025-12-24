using PGRFacilAPI.Application.DTOs;
using PGRFacilAPI.Application.Enums;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Interfaces;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Services
{
    public class RiscoService(IProgramaService programaService, IRiscoRepository riscoRepository) : IRiscoService
    {
        public async Task<RiscoDTO> Create(Usuario usuario, Guid programaGuid, CreateRiscoDTO createRiscoDTO)
        {
            await VerificarStatusDoPrograma(usuario, programaGuid);
            Risco riscoToCreate = MapToRisco(createRiscoDTO, programaGuid);
            Risco createdRisco = await riscoRepository.Create(riscoToCreate);
            return MapToRiscoDTO(createdRisco);
        }

        public async Task<RiscoDTO> GetByID(Usuario usuario, Guid programaGuid, Guid riscoGuid)
        {
            await VerificarStatusDoPrograma(usuario, programaGuid);
            Risco risco = await riscoRepository.GetByID(programaGuid, riscoGuid);
            return MapToRiscoDTO(risco);
        }

        public async Task<IEnumerable<RiscoDTO>> GetAll(Usuario usuario, Guid programaGuid)
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

        public async Task<RiscoDTO> Update(Usuario usuario, Guid programaGuid, UpdateRiscoDTO updateRiscoDTO)
        {
            await VerificarStatusDoPrograma(usuario, programaGuid);
            Risco riscoParaAtualizar = MapToRisco(updateRiscoDTO, programaGuid);
            Risco riscoAtualizado = await riscoRepository.Update(riscoParaAtualizar);
            return MapToRiscoDTO(riscoAtualizado);
        }

        public async Task Delete(Usuario usuario, Guid programaGuid, Guid riscoGuid)
        {
            await VerificarStatusDoPrograma(usuario, programaGuid);
            await riscoRepository.Delete(riscoGuid);
        }

        private async Task VerificarStatusDoPrograma(Usuario usuario, Guid programaGuid)
        {
            StatusDoPrograma statusDoPrograma = await programaService.VerificarStatusDoPrograma(usuario, programaGuid);
            switch (statusDoPrograma)
            {
                case StatusDoPrograma.NaoExiste:
                    throw new EntityNotFoundException();
                case StatusDoPrograma.ExisteMasSemPermissao:
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

        private static Risco MapToRisco(UpdateRiscoDTO updateRiscoDTO, Guid programaID)
        {
            return new Risco
            {
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
                Probabilidade = risco.Probabilidade
            };
        }
    }
}
