using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.PlanoDeAcao.PlanoDeAcaoCreate;
using PGRFacilAPI.Application.PlanoDeAcao.PlanoDeAcaoDelete;
using PGRFacilAPI.Application.PlanoDeAcao.PlanoDeAcaoGet;
using PGRFacilAPI.Application.PlanoDeAcao.PlanoDeAcaoUpdate;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Presentation.PlanoDeAcao
{
    [ApiController]
    [Route("API/Ghes/{gheId}/Riscos/{riscoId}/PlanoDeAcao")]
    [Authorize]
    public class PlanoDeAcaoController(PlanoDeAcaoCreateUseCase createUseCase, PlanoDeAcaoGetUseCase getUseCase, PlanoDeAcaoDeleteUseCase deleteUseCase, PlanoDeAcaoUpdateUseCase updateUseCase) : Controller
    {
        [HttpPost]
        [Authorize(Roles = Permissoes.Editor)]
        [ProducesResponseType(typeof(PlanoDeAcaoOutputRequest), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<PlanoDeAcaoOutputRequest>> Create(Guid riscoId, [FromBody] PlanoDeAcaoCreateInputRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var dto = new PlanoDeAcaoCreateInputDto(riscoId, request.Responsavel, request.DataInicio, request.DataConclusao, request.Descricao);

                PlanoDeAcaoCreateOutputDto result = await createUseCase.Execute(dto);
                var output = PlanoDeAcaoOutputRequest.From(result.PlanoDeAcao);
                return CreatedAtAction(nameof(Create), new { id = output.Id }, output);
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpGet]
        [Authorize(Roles = Permissoes.Reader)]
        [ProducesResponseType(typeof(PlanoDeAcaoOutputRequest), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<PlanoDeAcaoOutputRequest>> Get(Guid riscoId)
        {
            try
            {
                var dto = new PlanoDeAcaoGetInputDto(riscoId);
                PlanoDeAcaoGetOutputDto result = await getUseCase.Execute(dto);
                var output = PlanoDeAcaoOutputRequest.From(result.PlanoDeAcao);
                return Ok(output);
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpPatch]
        [Authorize(Roles = Permissoes.Editor)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Update(Guid riscoId, [FromBody] PlanoDeAcaoUpdateInputRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var dto = new PlanoDeAcaoUpdateInputDto(riscoId, request.Responsavel, request.DataInicio, request.DataConclusao, request.Descricao);
                await updateUseCase.Execute(dto);
                return NoContent();
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete]
        [Authorize(Roles = Permissoes.Editor)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(Guid riscoId)
        {
            try
            {
                var dto = new PlanoDeAcaoDeleteInputDto(riscoId);
                await deleteUseCase.Execute(dto);
                return NoContent();
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
        }
    }
}

