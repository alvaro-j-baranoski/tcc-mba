using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.DTOs.Risks;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Risco.RiscoCreate;
using PGRFacilAPI.Application.Risco.RiscoDelete;
using PGRFacilAPI.Application.Risco.RiscoGetAll;
using PGRFacilAPI.Application.Risco.RiscoGetById;
using PGRFacilAPI.Application.Risco.RiscoUpdate;
using PGRFacilAPI.Application.Services;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Presentation.Risco
{
    [ApiController]
    [Route("API/Programs/{programGuid}/Risks")]
    [Authorize]
    public class RiscoController(RiscoCreateUseCase createUseCase,
        RiscoGetByIdUseCase getByIdUseCase,
        RiscoGetAllUseCase getAllUseCase,
        RiscoUpdateUseCase updateUseCase,
        RiscoDeleteUseCase deleteUseCase,
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
            try
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
            catch (EntityNotFoundException)
            {
                return NotFound(programGuid);
            }
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
                return NotFound();
            }
        }

        [HttpGet]
        [Authorize(Roles = Roles.Reader)]
        [ProducesResponseType(typeof(IEnumerable<RiscoOutputRequest>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<RiscoOutputRequest>>> GetAll(Guid programGuid)
        {
            try
            {
                var input = new RiscoGetAllInputDto(programGuid);
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
                return NotFound(programGuid);
            }
        }

        [HttpPatch("{riskGuid}")]
        [Authorize(Roles = Roles.Editor)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Update(Guid programGuid, Guid riskGuid, RiscoUpdateInputRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var input = new RiscoUpdateInputDto(programGuid, riskGuid, request.Local, request.Atividades, request.Perigos, request.Danos, 
                    request.Agentes, request.TipoDeAvaliacao, request.Severidade, request.Probabilidade);

                await updateUseCase.Execute(input);
                return NoContent();
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
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
                var input = new RiscoDeleteInputDto(programGuid, riskGuid);
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
