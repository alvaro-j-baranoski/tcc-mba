using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.DTOs.Reports;
using PGRFacilAPI.Application.Services;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Presentation.Controllers
{
    [ApiController]
    [Route("API/Reports")]
    [Authorize]
    public class ReportsController(IReportsService reportsService) : Controller
    {
        [HttpGet("RiskMatrix")]
        [Authorize(Roles = Roles.Reader)]
        [ProducesResponseType(typeof(RiskMatrixDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<RiskMatrixDTO>> GetRiskMatrix()
        {
            return Ok(await reportsService.GetRiskMatrix());
        }
    }
}
