using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.Perigo.PerigoCreate;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Presentation.Perigo
{
    [ApiController]
    [Route("API/Perigos")]
    [Authorize]
    public class PerigoController(PerigoCreateUseCase createUseCase) : Controller
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
    }
}
