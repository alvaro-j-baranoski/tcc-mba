using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.Dano.DanoCreate;
using PGRFacilAPI.Application.Dano.DanoDelete;
using PGRFacilAPI.Application.Dano.DanoGetAll;
using PGRFacilAPI.Application.Dano.DanoUpdate;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Shared;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Presentation.Dano
{
    [ApiController]
    [Route("API/Danos")]
    [Authorize]
    public class DanoController(DanoCreateUseCase createUseCase,
        DanoGetAllUseCase getAllUseCase,
        DanoUpdateUseCase updateUseCase,
        DanoDeleteUseCase deleteUseCase) : Controller
    {
        [HttpPost]
        [Authorize(Roles = Permissoes.Editor)]
        [ProducesResponseType(typeof(DanoOutputRequest), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<DanoOutputRequest>> Create([FromBody] DanoCreateInputRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var dto = new DanoCreateInputDto(request.Descricao);
                DanoCreateOutputDto result = await createUseCase.Execute(dto);
                var output = new DanoOutputRequest(result.Dano.Id, result.Dano.Descricao);
                return CreatedAtAction(nameof(Create), new { id = output.Id }, output);
            }
            catch (DatabaseOperationException)
            {
                return BadRequest("Um dano com essa descrição já está cadastrado.");
            }
        }

        [HttpGet]
        [Authorize(Roles = Permissoes.Reader)]
        [ProducesResponseType(typeof(PaginatedResponse<DanoOutputRequest>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<PaginatedResponse<DanoOutputRequest>>> GetAll([FromQuery] int start = 0,
            [FromQuery] int limit = 25,
            [FromQuery] string sortDirection = "asc",
            [FromQuery] string? descricao = null)
        {
            try
            {
                QueryParameterHelper.Validate(start, limit, 25, sortDirection);
                var input = new DanoGetAllInputDto(descricao, start, limit, QueryParameterHelper.SerializeSortDirection(sortDirection));
                DanoGetAllOutputDto dto = await getAllUseCase.Execute(input);
                IEnumerable<DanoOutputRequest> result = dto.Danos.Select(d => new DanoOutputRequest(d.Id, d.Descricao));
                var response = new PaginatedResponse<DanoOutputRequest>(result, Request.Path, dto.HasMoreData, start, limit);
                return Ok(response);
            }
            catch (QueryParameterValidationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch("{danoId}")]
        [Authorize(Roles = Permissoes.Editor)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Update(Guid danoId, [FromBody] DanoUpdateInputRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var input = new DanoUpdateInputDto(danoId, request.Descricao);
                await updateUseCase.Execute(input);
                return NoContent();
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
            catch (DatabaseOperationException)
            {
                return BadRequest("Um dano com essa descrição já está cadastrado.");
            }
        }

        [HttpDelete("{danoId}")]
        [Authorize(Roles = Permissoes.Editor)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(Guid danoId)
        {
            try
            {
                var input = new DanoDeleteInputDto(danoId);
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
