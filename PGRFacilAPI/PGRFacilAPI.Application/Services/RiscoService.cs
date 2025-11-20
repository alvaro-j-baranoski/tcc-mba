using PGRFacilAPI.Application.DTOs;
using PGRFacilAPI.Application.Interfaces;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Services
{
    public class RiscoService(IRiscoRepository riscoRepository) : IRiscoService
    {
        public async Task<RiscoDTO> Create(CreateRiscoDTO createRiscoDTO)
        {
            Risco riscoToCreate = MapToRisco(createRiscoDTO);
            Risco createdRisco = await riscoRepository.Create(riscoToCreate);
            return MapToRiscoDTO(createdRisco);
        }

        private static Risco MapToRisco(CreateRiscoDTO createRiscoDTO)
        {
            return new Risco(
                createRiscoDTO.Local,
                createRiscoDTO.Atividades,
                createRiscoDTO.Perigos,
                createRiscoDTO.Danos,
                createRiscoDTO.AgentesDeRisco,
                createRiscoDTO.TipoDeAvaliacao,
                createRiscoDTO.Severidade,
                createRiscoDTO.Probabilidade);
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

        public async Task<RiscoDTO> GetByGuid(Guid guid)
        {
            Risco risco = await riscoRepository.GetByGuid(guid);
            return MapToRiscoDTO(risco);
        }
    }
}
