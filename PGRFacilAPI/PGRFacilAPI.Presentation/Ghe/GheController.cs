using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Ghe.GheCreate;
using PGRFacilAPI.Application.Ghe.GheDelete;
using PGRFacilAPI.Application.Ghe.GheGetAll;
using PGRFacilAPI.Application.Ghe.GheGetById;
using PGRFacilAPI.Application.Ghe.GheUpdate;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Presentation.Ghe
{
    [ApiController]
    [Route("API/Programs")]
    [Authorize]
    public class GheController(GheCreateUseCase createUseCase,
        GheGetByIdUseCase getByIdUseCase,
        GheGetAllUseCase getAllUseCase,
        GheUpdateUseCase updateUseCase,
        GheDeleteUseCase deleteUseCase) : Controller
    {
        [HttpPost]
        [Authorize(Roles = Roles.Editor)]
        [ProducesResponseType(typeof(GheCreateOutputRequest), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<GheCreateOutputRequest>> Create([FromBody] GheCreateInputRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var dto = new GheCreateInputDto(request.Nome);
                GheCreateOutputDto outputDto = await createUseCase.Execute(dto);

                var result = new GheCreateOutputRequest(outputDto.Ghe.Id, outputDto.Ghe.Nome, outputDto.Ghe.AtualizadoEm,
                    outputDto.Ghe.NumeroDeRiscos, outputDto.Ghe.Versao);

                return CreatedAtAction(nameof(Create), new { id = result.Id }, result);
            }
            catch (UserNotFoundException)
            {
                return Forbid();
            }
        }

        [HttpGet("{guid}")]
        [Authorize(Roles = Roles.Reader)]
        [ProducesResponseType(typeof(GheGetByIdOutputRequest), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<GheGetByIdOutputRequest>> GetById(Guid guid)
        {
            try
            {
                GheGetByIdOutputDto result = await getByIdUseCase.Execute(new GheGetByIdInputDto(guid));
                var output = new GheGetByIdOutputRequest(result.Ghe.Id, result.Ghe.Nome, result.Ghe.AtualizadoEm,
                    result.Ghe.NumeroDeRiscos, result.Ghe.Versao);
                return Ok(output);
            }
            catch (EntityNotFoundException)
            {
                return NotFound(guid);
            }
        }

        [HttpGet]
        [Authorize(Roles = Roles.Reader)]
        [ProducesResponseType(typeof(GheGetAllOutputRequest), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<GheGetAllOutputRequest>> GetAll()
        {
            GheGetAllOutputDto dto = await getAllUseCase.Execute();
            List<GheOutputRequest> result = [];
            foreach (var ghe in dto.Ghes)
            {
                result.Add(new GheOutputRequest(ghe.Id, ghe.Nome, ghe.AtualizadoEm, ghe.NumeroDeRiscos, ghe.Versao));
            }
            return Ok(new GheGetAllOutputRequest(result));
        }

        [HttpPatch("{guid}")]
        [Authorize(Roles = Roles.Editor)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Update(Guid guid, GheUpdateInputRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var dto = new GheUpdateInputDto(guid, request.Nome);
                await updateUseCase.Execute(dto);
                return NoContent();
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{guid}")]
        [Authorize(Roles = Roles.Editor)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(Guid guid)
        {
            try
            {
                var dto = new GheDeleteInputDto(guid);
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
