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
            try
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
            catch (DatabaseOperationException)
            {
                return BadRequest("Um perigo com essa descrição já está cadastrado.");
            }
        }

        [HttpGet]
        [Authorize(Roles = Permissoes.Reader)]
        [ProducesResponseType(typeof(PaginatedResponse<PerigoOutputRequest>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<PaginatedResponse<PerigoOutputRequest>>> GetAll([FromQuery] PerigoGetAllQueryFilters query)
        {
            try
            {
                QueryParameterHelper.Validate(query.Start, query.Limit, 25, query.SortDirection);
                PerigoGetAllInputDto input = query.ToInputDto();
                PerigoGetAllOutputDto dto = await getAllUseCase.Execute(input);
                IEnumerable<PerigoOutputRequest> result = dto.Perigos.Select(p => new PerigoOutputRequest(p.Id, p.Descricao));
                var response = new PaginatedResponse<PerigoOutputRequest>(result, Request, dto.HasMoreData, query.Start, query.Limit);
                return Ok(response);
            }
            catch (QueryParameterValidationException ex)
            {
                return BadRequest(ex.Message);
            }
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
            catch (DatabaseOperationException)
            {
                return BadRequest("Um perigo com essa descrição já está cadastrado.");
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