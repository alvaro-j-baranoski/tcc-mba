using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Risco.RiscoCreate;
using PGRFacilAPI.Application.Risco.RiscoDelete;
using PGRFacilAPI.Application.Risco.RiscoGetAll;
using PGRFacilAPI.Application.Risco.RiscoGetById;
using PGRFacilAPI.Application.Risco.RiscoUpdate;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Presentation.Risco
{
    [ApiController]
    [Route("API/Ghes/{gheId}/Riscos")]
    [Authorize]
    public class RiscoController(RiscoCreateUseCase createUseCase,
        RiscoGetByIdUseCase getByIdUseCase,
        RiscoGetAllUseCase getAllUseCase,
        RiscoUpdateUseCase updateUseCase,
        RiscoDeleteUseCase deleteUseCase) : Controller
    {
        [HttpPost]
        [Authorize(Roles = Permissoes.Editor)]
        [ProducesResponseType(typeof(RiscoOutputRequest), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<RiscoOutputRequest>> Create(Guid gheId, [FromBody] RiscoCreateInputRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var dto = new RiscoCreateInputDto(gheId, request.Local, request.Atividades, request.PerigoIds, request.DanoIds, request.Agentes,
                    request.TipoDeAvaliacao, request.Severidade, request.Probabilidade);

                RiscoCreateOutputDto result = await createUseCase.Execute(dto);
                var output = RiscoOutputRequest.From(result.Risco);
                return CreatedAtAction(nameof(Create), new { id = output.Id }, output);
            }
            catch (EntityNotFoundException)
            {
                return NotFound(gheId);
            }
        }

        [HttpGet("{riscoId}")]
        [Authorize(Roles = Permissoes.Reader)]
        [ProducesResponseType(typeof(RiscoOutputRequest), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<RiscoOutputRequest>> GetById(Guid gheId, Guid riscoId)
        {
            try
            {
                var input = new RiscoGetByIdInputDto(gheId, riscoId);
                RiscoGetByIdOutputDto dto = await getByIdUseCase.Execute(input);
                var result = RiscoOutputRequest.From(dto.Risco);
                return Ok(result);
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpGet]
        [Authorize(Roles = Permissoes.Reader)]
        [ProducesResponseType(typeof(IEnumerable<RiscoOutputRequest>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<RiscoOutputRequest>>> GetAll(Guid gheId)
        {
            try
            {
                var input = new RiscoGetAllInputDto(gheId);
                RiscoGetAllOutputDto dto = await getAllUseCase.Execute(input);

                List<RiscoOutputRequest> result = [];
                foreach (var risco in dto.Riscos)
                {
                    result.Add(RiscoOutputRequest.From(risco));
                }

                return Ok(result);
            }
            catch (EntityNotFoundException)
            {
                return NotFound(gheId);
            }
        }

        [HttpPatch("{riscoId}")]
        [Authorize(Roles = Permissoes.Editor)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Update(Guid gheId, Guid riscoId, RiscoUpdateInputRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var input = new RiscoUpdateInputDto(gheId, riscoId, request.Local, request.Atividades, request.PerigoIds, request.DanoIds, 
                    request.Agentes, request.TipoDeAvaliacao, request.Severidade, request.Probabilidade);

                await updateUseCase.Execute(input);
                return NoContent();
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{riscoId}")]
        [Authorize(Roles = Permissoes.Editor)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(Guid gheId, Guid riscoId)
        {
            try
            {
                var input = new RiscoDeleteInputDto(gheId, riscoId);
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
