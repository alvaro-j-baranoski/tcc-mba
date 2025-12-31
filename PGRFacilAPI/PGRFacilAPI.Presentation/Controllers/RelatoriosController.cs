using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.DTOs;
using PGRFacilAPI.Application.Services;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Presentation.Controllers
{
    [ApiController]
    [Route("API/Relatorios")]
    [Authorize]
    public class RelatoriosController(IRelatoriosService relatoriosService) : Controller
    {
        [HttpGet("MatrizDeRisco")]
        [ProducesResponseType(typeof(MatrizDeRiscoDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<MatrizDeRiscoDTO>> MatrizDeRisco()
        {
            return Ok(await relatoriosService.GetMatrizDeRisco());
        }
    }
}
