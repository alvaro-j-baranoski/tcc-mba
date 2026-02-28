using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Perigo.PerigoCreate;
using PGRFacilAPI.Application.Perigo.PerigoDelete;
using PGRFacilAPI.Application.Perigo.PerigoGetAll;
using PGRFacilAPI.Application.Perigo.PerigoUpdate;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Presentation.Perigo
{
    [ApiController]
    [Route("API/Perigos")]
    [Authorize]
    public class PerigoController(PerigoCreateUseCase createUseCase, PerigoGetAllUseCase getAllUseCase, PerigoUpdateUseCase updateUseCase, PerigoDeleteUseCase deleteUseCase) : Controller
    {
        [HttpPost]
        [Authorize(Roles = Permissoes.Editor)]
        [ProducesResponseType(typeof(PerigoOutputRequest), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<PerigoOutputRequest>> Create([FromBody] PerigoCreateInputRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var dto = new PerigoCreateInputDto(request.Descricao);
            PerigoCreateOutputDto result = await createUseCase.Execute(dto);
            var output = new PerigoOutputRequest(result.Perigo.Id, result.Perigo.Descricao);
            return CreatedAtAction(nameof(Create), new { id = output.Id }, output);
        }

        [HttpGet]
        [Authorize(Roles = Permissoes.Reader)]
        [ProducesResponseType(typeof(IEnumerable<PerigoOutputRequest>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<IEnumerable<PerigoOutputRequest>>> GetAll()
        {
            PerigoGetAllOutputDto dto = await getAllUseCase.Execute();

            List<PerigoOutputRequest> result = [];
            foreach (var perigo in dto.Perigos)
            {
                result.Add(new PerigoOutputRequest(perigo.Id, perigo.Descricao));
            }

            return Ok(result);
        }

        [HttpPatch("{perigoId}")]
        [Authorize(Roles = Permissoes.Editor)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Update(Guid perigoId, [FromBody] PerigoUpdateInputRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var input = new PerigoUpdateInputDto(perigoId, request.Descricao);
                await updateUseCase.Execute(input);
                return NoContent();
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{perigoId}")]
        [Authorize(Roles = Permissoes.Editor)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(Guid perigoId)
        {
            try
            {
                var input = new PerigoDeleteInputDto(perigoId);
                await deleteUseCase.Execute(input);
                return NoContent();
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
        }
    }
}

