using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.Dano.DanoCreate;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Presentation.Dano
{
    [ApiController]
    [Route("API/Danos")]
    [Authorize]
    public class DanoController(DanoCreateUseCase createUseCase) : Controller
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
    }
}
