using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.Relatorio.MatrizDeRisco;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Presentation.Relatorio
{
    [ApiController]
    [Route("API/Reports")]
    [Authorize]
    public class RelatorioController(MatrizDeRiscoUseCase matrizDeRiscoUseCase) : Controller
    {
        [HttpGet("RiskMatrix")]
        [Authorize(Roles = Roles.Reader)]
        [ProducesResponseType(typeof(MatrizDeRiscoOutputRequest), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<MatrizDeRiscoOutputRequest>> GetMatrizDeRisco()
        {
            MatrizDeRiscoOutputDto dto = await matrizDeRiscoUseCase.Execute();
            var result = new MatrizDeRiscoOutputRequest
            {
                Agentes = dto.Agentes
                    .Select(a => new MatrizDeRiscoAgentesOutputRequest
                    {
                        Agente = a.Agente,
                        Significancias = a.Significancias
                            .Select(s => new MatrizDeRiscoSignificanciasOutputRequest
                            {
                                Significancia = s.Significancia,
                                NumeroDeRiscos = s.NumeroDeRiscos,
                            })
                            .ToArray(),
                    })
                    .ToArray(),
            };

            return Ok(result);
        }
    }
}
