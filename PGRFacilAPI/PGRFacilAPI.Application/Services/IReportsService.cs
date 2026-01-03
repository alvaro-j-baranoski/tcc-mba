using PGRFacilAPI.Application.DTOs.Reports;

namespace PGRFacilAPI.Application.Services
{
    public interface IReportsService
    {
        Task<RiskMatrixDTO> GetRiskMatrix();
    }
}
