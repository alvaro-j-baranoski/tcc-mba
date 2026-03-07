using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.PlanoDeAcao.PlanoDeAcaoCreate;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Presentation.PlanoDeAcao
{
    [ApiController]
    [Route("API/Ghes/{gheId}/Riscos/{riscoId}/PlanoDeAcao")]
    [Authorize]
    public class PlanoDeAcaoController(PlanoDeAcaoCreateUseCase createUseCase) : Controller
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
    }
}
