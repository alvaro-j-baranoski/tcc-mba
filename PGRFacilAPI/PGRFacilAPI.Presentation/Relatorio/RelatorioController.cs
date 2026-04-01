using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Relatorio.MatrizDeRisco;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Presentation.Relatorio
{
    [ApiController]
    [Authorize]
    public class RelatorioController(MatrizDeRiscoUseCase matrizDeRiscoUseCase, MatrizDeRiscoByGheUseCase matrizDeRiscoByGheUseCase) : Controller
    {
        [HttpGet("API/Relatorios/MatrizDeRisco")]
        [Authorize(Roles = Permissoes.Reader)]
        [ProducesResponseType(typeof(MatrizDeRiscoOutputRequest), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<MatrizDeRiscoOutputRequest>> GetMatrizDeRisco()
        {
            MatrizDeRiscoOutputDto dto = await matrizDeRiscoUseCase.Execute();
            var result = MapToOutputRequest(dto);

            return Ok(result);
        }

        [HttpGet("API/Ghes/{gheId}/MatrizDeRisco")]
        [Authorize(Roles = Permissoes.Reader)]
        [ProducesResponseType(typeof(MatrizDeRiscoOutputRequest), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MatrizDeRiscoOutputRequest>> GetMatrizDeRiscoByGhe(Guid gheId)
        {
            try
            {
                MatrizDeRiscoOutputDto dto = await matrizDeRiscoByGheUseCase.Execute(new MatrizDeRiscoByGheInputDto(gheId));
                var result = MapToOutputRequest(dto);

                return Ok(result);
            }
            catch (EntityNotFoundException)
            {
                return NotFound(gheId);
            }
        }

        private static MatrizDeRiscoOutputRequest MapToOutputRequest(MatrizDeRiscoOutputDto dto)
        {
            return new MatrizDeRiscoOutputRequest
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
        }
    }
}
