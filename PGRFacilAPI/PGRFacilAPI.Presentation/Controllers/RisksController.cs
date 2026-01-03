using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.DTOs.Programs;
using PGRFacilAPI.Application.DTOs.Risks;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Services;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Presentation.Controllers
{
    [ApiController]
    [Route("API/Programs/{programGuid}/Risks")]
    [Authorize]
    public class RisksController(IRisksService risksService) : Controller
    {
        [HttpPost]
        [Authorize(Roles = Roles.Editor)]
        [ProducesResponseType(typeof(RiskDTO), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<RiskDTO>> Create(Guid programGuid, [FromBody] CreateRiskDTO createRiskDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                RiskDTO riskDTO = await risksService.Create(User, programGuid, createRiskDTO);
                return CreatedAtAction(nameof(Create), new { id = riskDTO.Guid }, riskDTO);
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

        [HttpGet("{riskGuid}")]
        [Authorize(Roles = Roles.Reader)]
        [ProducesResponseType(typeof(RiskDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<RiskDTO>> GetByID(Guid programGuid, Guid riskGuid)
        {
            try
            {
                return Ok(await risksService.GetByID(programGuid, riskGuid));
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
        [ProducesResponseType(typeof(ProgramDTO), StatusCodes.Status200OK)]
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
