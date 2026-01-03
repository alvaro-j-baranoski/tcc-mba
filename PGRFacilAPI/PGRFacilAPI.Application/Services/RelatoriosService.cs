using PGRFacilAPI.Application.DTOs.Reports;
using PGRFacilAPI.Application.Models;

namespace PGRFacilAPI.Application.Services
{
    public class RelatoriosService(IRisksService risksService) : IReportsService
    {
        public async Task<RiskMatrixDTO> GetRiskMatrix()
        {
            var result = new RiskMatrixDTO();
            IEnumerable<SimplifiedRisk> risks = await risksService.GetSimplifiedRisk();
            foreach (var item in result.Agents)
            {
                var risksPerAgent = risks.Where(r => r.Agent == item.Agent);
                foreach (var significance in item.Significances)
                {
                    var risksPerSignificance = risksPerAgent.Where(r => r.SignificanceLevel == significance.Significance);
                    if (risksPerSignificance is not null)
                    {
                        significance.NumberOfRisks = (uint)risksPerSignificance.Count();
                    }
                }
            }
            return result;
        }
    }
}
