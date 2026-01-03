using PGRFacilAPI.Application.DTOs.Risks;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Interfaces;
using PGRFacilAPI.Application.Models;
using PGRFacilAPI.Domain.Models;
using System.Security.Claims;

namespace PGRFacilAPI.Application.Services
{
    public class RisksService(IProgramsService programsService, IRisksRepository risksRepository) : IRisksService
    {
        public async Task<RiskDTO> Create(ClaimsPrincipal userClaims, Guid programGuid, CreateRiskDTO createRiskDTO)
        {
            await CheckIfProgramExists(programGuid);
            Risco riscoToCreate = MapToRisk(createRiskDTO, programGuid);
            Risco createdRisco = await risksRepository.Create(riscoToCreate);
            await programsService.UpdateProgramDate(programGuid);
            return MapToRiskDTO(createdRisco);
        }

        public async Task<RiskDTO> GetByID(Guid programGuid, Guid riskGuid)
        {
            await CheckIfProgramExists(programGuid);
            Risco risco = await risksRepository.GetByID(programGuid, riskGuid);
            return MapToRiskDTO(risco);
        }

        public async Task<IEnumerable<RiskDTO>> GetAll(Guid programGuid)
        {
            await CheckIfProgramExists(programGuid);
            IEnumerable<Risco> risks = await risksRepository.GetAll(programGuid);
            List<RiskDTO> riscosDTO = [];
            foreach (var risco in risks)
            {
                riscosDTO.Add(MapToRiskDTO(risco));
            }
            return riscosDTO;
        }

        public async Task<RiskDTO> Update(ClaimsPrincipal userClaims, Guid programGuid, Guid riskGuid, UpdateRiskDTO updateRiskDTO)
        {
            await CheckIfProgramExists(programGuid);
            Risco riskToUpdate = MapToRisk(updateRiskDTO, programGuid, riskGuid);
            Risco updatedRisk = await risksRepository.Update(riskToUpdate);
            await programsService.UpdateProgramDate(programGuid);
            return MapToRiskDTO(updatedRisk);
        }

        public async Task Delete(Guid programGuid, Guid riskGuid)
        {
            await CheckIfProgramExists(programGuid);
            await risksRepository.Delete(riskGuid);
            await programsService.UpdateProgramDate(programGuid);
        }

        private async Task CheckIfProgramExists(Guid programGuid)
        {
            try
            {
                await programsService.GetByID(programGuid);
            }
            catch (EntityNotFoundException)
            {
                throw;
            }
        }

        private static Risco MapToRisk(CreateRiskDTO createRiscoDTO, Guid programaID)
        {
            return new Risco
            {
                Local = createRiscoDTO.Local,
                Atividades = createRiscoDTO.Activities,
                Perigos = createRiscoDTO.Dangers,
                Danos = createRiscoDTO.Damages,
                AgentesDeRisco = createRiscoDTO.Agent,
                TipoDeAvaliacao = createRiscoDTO.AssessementType,
                Severidade = createRiscoDTO.Severity,
                Probabilidade = createRiscoDTO.Probability,
                ProgramaID = programaID
            };
        }

        private static Risco MapToRisk(UpdateRiskDTO updateRiscoDTO, Guid programaID, Guid riscoGuid)
        {
            return new Risco
            {
                Guid = riscoGuid,
                Local = updateRiscoDTO.Local,
                Atividades = updateRiscoDTO.Activities,
                Perigos = updateRiscoDTO.Dangers,
                Danos = updateRiscoDTO.Damages,
                AgentesDeRisco = updateRiscoDTO.Agent,
                TipoDeAvaliacao = updateRiscoDTO.AssessementType,
                Severidade = updateRiscoDTO.Severity,
                Probabilidade = updateRiscoDTO.Probability,
                ProgramaID = programaID
            };
        }

        private static RiskDTO MapToRiskDTO(Risco risco)
        {
            return new RiskDTO
            {
                Guid = risco.Guid,
                Local = risco.Local,
                Activites = risco.Atividades,
                Dangers = risco.Perigos,
                Damages = risco.Danos,
                Agent = risco.AgentesDeRisco,
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
