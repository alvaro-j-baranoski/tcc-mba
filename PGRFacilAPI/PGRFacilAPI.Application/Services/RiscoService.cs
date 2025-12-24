using PGRFacilAPI.Application.DTOs;
using PGRFacilAPI.Application.Interfaces;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Services
{
    public class RiscoService(IProgramaRepository programaRepository, IRiscoRepository riscoRepository) : IRiscoService
    {
        public async Task<RiscoDTO> Create(Usuario usuario, Guid programaGuid, CreateRiscoDTO createRiscoDTO)
        {
            Programa programa = await programaRepository.GetByID(programaGuid, usuario.Id);
            Risco riscoToCreate = MapToRisco(createRiscoDTO, programa.Guid);
            Risco createdRisco = await riscoRepository.Create(riscoToCreate);
            return MapToRiscoDTO(createdRisco);
        }

        public async Task<RiscoDTO> GetByID(Usuario usuario, Guid programaGuid, Guid riscoGuid)
        {
            Programa programa = await programaRepository.GetByID(programaGuid, usuario.Id);
            Risco risco = await riscoRepository.GetByID(programa.Guid, riscoGuid);
            return MapToRiscoDTO(risco);
        }

        private static Risco MapToRisco(CreateRiscoDTO createRiscoDTO, Guid programaID)
        {
            return new Risco(
                createRiscoDTO.Local,
                createRiscoDTO.Atividades,
                createRiscoDTO.Perigos,
                createRiscoDTO.Danos,
                createRiscoDTO.AgentesDeRisco,
                createRiscoDTO.TipoDeAvaliacao,
                createRiscoDTO.Severidade,
                createRiscoDTO.Probabilidade)
            {
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
