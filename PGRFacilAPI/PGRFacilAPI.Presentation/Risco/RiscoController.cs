using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.DTOs.Risks;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Risco.RiscoCreate;
using PGRFacilAPI.Application.Risco.RiscoGetById;
using PGRFacilAPI.Application.Services;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Presentation.Risco
{
    [ApiController]
    [Route("API/Programs/{programGuid}/Risks")]
    [Authorize]
    public class RiscoController(RiscoCreateUseCase createUseCase, 
        RiscoGetByIdUseCase getByIdUseCase, 
        IRisksService risksService) : Controller
    {
        [HttpPost]
        [Authorize(Roles = Roles.Editor)]
        [ProducesResponseType(typeof(RiscoOutputRequest), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<RiscoOutputRequest>> Create(Guid programGuid, [FromBody] RiscoCreateInputRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var dto = new RiscoCreateInputDto(programGuid, request.Local, request.Atividades, request.Perigos, request.Danos, request.Agentes, 
                request.TipoDeAvaliacao, request.Severidade, request.Probabilidade);

            RiscoCreateOutputDto result = await createUseCase.Execute(dto);
            var output = RiscoOutputRequest.From(result.Risco);
            return CreatedAtAction(nameof(Create), new { id = output.Id }, output);
        }

        [HttpGet("{riskGuid}")]
        [Authorize(Roles = Roles.Reader)]
        [ProducesResponseType(typeof(RiscoOutputRequest), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<RiscoOutputRequest>> GetById(Guid programGuid, Guid riskGuid)
        {
            try
            {
                var input = new RiscoGetByIdInputDto(programGuid, riskGuid);
                RiscoGetByIdOutputDto dto = await getByIdUseCase.Execute(input);
                var result = RiscoOutputRequest.From(dto.Risco);
                return Ok(result);
            }
            catch (EntityNotFoundException)
            {
                return NotFound(riskGuid);
            }
        }

        [HttpGet]
        [Authorize(Roles = Roles.Reader)]
        [ProducesResponseType(typeof(IEnumerable<RiskDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<RiskDTO>>> GetAll(Guid programGuid)
        {
            try
            {
                return Ok(await risksService.GetAll(programGuid));
            }
            catch (EntityNotFoundException)
            {
                return NotFound(programGuid);
            }
        }

        [HttpPatch("{riskGuid}")]
        [Authorize(Roles = Roles.Editor)]
        [ProducesResponseType(typeof(RiskDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<RiskDTO>> Update(Guid programGuid, Guid riskGuid, UpdateRiskDTO updateRiskDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                RiskDTO risco = await risksService.Update(User, programGuid, riskGuid, updateRiskDTO);
                return Ok(risco);
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
            catch (UserNotFoundException)
            {
                return Forbid();
            }
        }

        [HttpDelete("{riskGuid}")]
        [Authorize(Roles = Roles.Editor)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(Guid programGuid, Guid riskGuid)
        {
            try
            {
                await risksService.Delete(programGuid, riskGuid);
                return NoContent();
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
        }
    }
}
