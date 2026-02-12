using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.DTOs.Programs;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Ghe.GheCreate;
using PGRFacilAPI.Application.Services;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Presentation.Ghe
{
    [ApiController]
    [Route("API/Programs")]
    [Authorize]
    public class GheController(GheCreateUseCase createUseCase, IProgramsService programService) : Controller
    {
        [HttpPost]
        [Authorize(Roles = Roles.Editor)]
        [ProducesResponseType(typeof(GheCreateOutputRequest), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<GheCreateOutputRequest>> Create([FromBody] GheCreateInputRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var dto = new GheCreateInputDto(request.Nome);
                GheCreateOutputDto outputDto = await createUseCase.Execute(dto);
                
                var result = new GheCreateOutputRequest(outputDto.Id, outputDto.Nome, outputDto.AtualizadoEm, 
                    outputDto.NumeroDeRiscos, outputDto.Versao);
                
                return CreatedAtAction(nameof(Create), new { id = result.Id }, result);
            }
            catch (UserNotFoundException)
            {
                return Forbid();
            }
        }

        [HttpGet("{guid}")]
        [Authorize(Roles = Roles.Reader)]
        [ProducesResponseType(typeof(ProgramDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProgramDTO>> GetByID(Guid guid)
        {
            try
            {
                ProgramDTO programaDTO = await programService.GetByID(guid);
                return Ok(programaDTO);
            }
            catch (EntityNotFoundException)
            {
                return NotFound(guid);
            }
        }

        [HttpGet]
        [Authorize(Roles = Roles.Reader)]
        [ProducesResponseType(typeof(IEnumerable<ProgramDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<IEnumerable<ProgramDTO>>> GetAll()
        {
            return Ok(await programService.GetAll());
        }

        [HttpPatch("{guid}")]
        [Authorize(Roles = Roles.Editor)]
        [ProducesResponseType(typeof(ProgramDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProgramDTO>> Update(Guid guid, UpdateProgramDTO updateProgramDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                return Ok(await programService.Update(guid, updateProgramDTO, User));
            }
            catch (UserNotFoundException)
            {
                return Forbid();
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{guid}")]
        [Authorize(Roles = Roles.Editor)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(Guid guid)
        {
            try
            {
                await programService.Delete(guid);
                return NoContent();
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
        }
    }
}
