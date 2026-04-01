using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Versao.VersaoCreate;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Presentation.Versao
{
    [ApiController]
    [Route("API/Ghes/{gheId}/Versoes")]
    [Authorize]
    public class VersaoController(VersaoCreateUseCase createUseCase) : Controller
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
    }
}
