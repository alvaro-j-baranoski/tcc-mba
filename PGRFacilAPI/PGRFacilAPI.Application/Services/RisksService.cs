using PGRFacilAPI.Application.DTOs.Risks;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Ghe;
using PGRFacilAPI.Application.Models;
using PGRFacilAPI.Application.Risco;
using PGRFacilAPI.Domain.Models;
using System.Security.Claims;

namespace PGRFacilAPI.Application.Services
{
    public class RisksService(IGheRepository gheRepository, IRiscoRepository risksRepository) : IRisksService
    {
        public async Task<RiskDTO> Create(ClaimsPrincipal userClaims, Guid programGuid, CreateRiskDTO createRiskDTO)
        {
            await CheckIfProgramExists(programGuid);
            RiscoEntity riscoToCreate = MapToRisk(createRiskDTO, programGuid);
            RiscoEntity createdRisco = await risksRepository.Create(riscoToCreate);
            await gheRepository.UpdateDateTime(programGuid, DateTime.UtcNow);
            return MapToRiskDTO(createdRisco);
        }

        public async Task<RiskDTO> GetByID(Guid programGuid, Guid riskGuid)
        {
            await CheckIfProgramExists(programGuid);
            RiscoEntity risco = await risksRepository.GetById(programGuid, riskGuid);
            return MapToRiskDTO(risco);
        }

        public async Task<IEnumerable<RiskDTO>> GetAll(Guid programGuid)
        {
            await CheckIfProgramExists(programGuid);
            IEnumerable<RiscoEntity> risks = await risksRepository.GetAll(programGuid);
            List<RiskDTO> riscosDTO = [];
            foreach (var risco in risks)
            {
                riscosDTO.Add(MapToRiskDTO(risco));
            }
            return riscosDTO;
        }

        public async Task<RiskDTO> Update(ClaimsPrincipal userClaims, Guid programGuid, Guid riskGuid, UpdateRiskDTO updateRiskDTO)
        {
            //await CheckIfProgramExists(programGuid);
            //RiscoEntity riskToUpdate = MapToRisk(updateRiskDTO, programGuid, riskGuid);
            //RiscoEntity updatedRisk = await risksRepository.Update(riskToUpdate);
            //await gheRepository.UpdateDateTime(programGuid, DateTime.UtcNow);
            //return MapToRiskDTO(updatedRisk);
            return new RiskDTO { Activites = string.Empty, Agent = Domain.Enums.AgentesDeRisco.Ergonomico, AssessementType = "", Damages = "0", Dangers = "0", Local = ""};
        }

        public async Task Delete(Guid programGuid, Guid riskGuid)
        {
            await CheckIfProgramExists(programGuid);
            await risksRepository.Delete(riskGuid);
            await gheRepository.UpdateDateTime(programGuid, DateTime.UtcNow);
        }

        private async Task CheckIfProgramExists(Guid programGuid)
        {
            try
            {
                await gheRepository.GetById(programGuid);
            }
            catch (EntityNotFoundException)
            {
                throw;
            }
        }

        private static RiscoEntity MapToRisk(CreateRiskDTO createRiscoDTO, Guid programaID)
        {
            return new RiscoEntity
            {
                Local = createRiscoDTO.Local,
                Atividades = createRiscoDTO.Activities,
                Perigos = createRiscoDTO.Dangers,
                Danos = createRiscoDTO.Damages,
                Agentes = createRiscoDTO.Agent,
                TipoDeAvaliacao = createRiscoDTO.AssessementType,
                Severidade = createRiscoDTO.Severity,
                Probabilidade = createRiscoDTO.Probability,
                GheId = programaID
            };
        }

        private static RiscoEntity MapToRisk(UpdateRiskDTO updateRiscoDTO, Guid programaID, Guid riscoGuid)
        {
            return new RiscoEntity
            {
                Id = riscoGuid,
                Local = updateRiscoDTO.Local,
                Atividades = updateRiscoDTO.Activities,
                Perigos = updateRiscoDTO.Dangers,
                Danos = updateRiscoDTO.Damages,
                Agentes = updateRiscoDTO.Agent,
                TipoDeAvaliacao = updateRiscoDTO.AssessementType,
                Severidade = updateRiscoDTO.Severity,
                Probabilidade = updateRiscoDTO.Probability,
                GheId = programaID
            };
        }

        private static RiskDTO MapToRiskDTO(RiscoEntity risco)
        {
            return new RiskDTO
            {
                Guid = risco.Id,
                Local = risco.Local,
                Activites = risco.Atividades,
                Dangers = risco.Perigos,
                Damages = risco.Danos,
                Agent = risco.Agentes,
                AssessementType = risco.TipoDeAvaliacao,
                Severity = risco.Severidade,
                Probability = risco.Probabilidade,
                Significance = risco.Significancia,
                SignificanceLevel = risco.NivelSignificancia
            };
        }

        public async Task<IEnumerable<SimplifiedRisk>> GetSimplifiedRisk()
        {
            return await risksRepository.GetSimplifiedRisks();
        }
    }
}
