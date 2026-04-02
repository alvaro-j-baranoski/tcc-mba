using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Versao.VersaoCreate;
using PGRFacilAPI.Application.Versao.VersaoDelete;
using PGRFacilAPI.Application.Versao.VersaoGetAll;
using PGRFacilAPI.Application.Versao.VersaoUpdate;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Presentation.Versao
{
    [ApiController]
    [Route("API/Ghes/{gheId}/Versoes")]
    [Authorize]
    public class VersaoController(VersaoCreateUseCase createUseCase, VersaoGetAllUseCase getAllUseCase, VersaoUpdateUseCase updateUseCase, VersaoDeleteUseCase deleteUseCase) : Controller
    {
        [HttpPost]
        [Authorize(Roles = Permissoes.Editor)]
        [ProducesResponseType(typeof(VersaoOutputRequest), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<VersaoOutputRequest>> Create(Guid gheId, [FromBody] VersaoCreateInputRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var dto = new VersaoCreateInputDto(gheId, request.Versao, request.Observacoes);

                VersaoCreateOutputDto result = await createUseCase.Execute(dto);
                var output = VersaoOutputRequest.From(result.Versao);
                return CreatedAtAction(nameof(Create), new { id = output.Id }, output);
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Authorize(Roles = Permissoes.Reader)]
        [ProducesResponseType(typeof(IEnumerable<VersaoOutputRequest>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<VersaoOutputRequest>>> GetAll(Guid gheId)
        {
            try
            {
                VersaoGetAllOutputDto dto = await getAllUseCase.Execute(new VersaoGetAllInputDto(gheId));
                List<VersaoOutputRequest> result = [];
                foreach (var versao in dto.Versoes)
                {
                    result.Add(VersaoOutputRequest.From(versao));
                }
                return Ok(result);
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpPatch("{versaoId}")]
        [Authorize(Roles = Permissoes.Editor)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Update(int versaoId, [FromBody] VersaoUpdateInputRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var dto = new VersaoUpdateInputDto(versaoId, request.Versao, request.Observacoes);
                await updateUseCase.Execute(dto);
                return NoContent();
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{versaoId}")]
        [Authorize(Roles = Permissoes.Editor)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int versaoId)
        {
            try
            {
                var dto = new VersaoDeleteInputDto(versaoId);
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
