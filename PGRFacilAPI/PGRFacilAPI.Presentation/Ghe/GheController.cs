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
    [Route("API/Ghes")]
    [Authorize]
    public class GheController(GheCreateUseCase createUseCase,
        GheGetByIdUseCase getByIdUseCase,
        GheGetAllUseCase getAllUseCase,
        GheUpdateUseCase updateUseCase,
        GheDeleteUseCase deleteUseCase) : Controller
    {
        [HttpPost]
        [Authorize(Roles = Roles.Editor)]
        [ProducesResponseType(typeof(GheOutputRequest), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<GheOutputRequest>> Create([FromBody] GheCreateInputRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var dto = new GheCreateInputDto(request.Nome);
            GheCreateOutputDto outputDto = await createUseCase.Execute(dto);

            var result = GheOutputRequest.From(outputDto.Ghe);

            return CreatedAtAction(nameof(Create), new { id = result.Id }, result);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = Roles.Reader)]
        [ProducesResponseType(typeof(GheOutputRequest), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<GheOutputRequest>> GetById(Guid id)
        {
            try
            {
                GheGetByIdOutputDto result = await getByIdUseCase.Execute(new GheGetByIdInputDto(id));
                var output = GheOutputRequest.From(result.Ghe);
                return Ok(output);
            }
            catch (EntityNotFoundException)
            {
                return NotFound(id);
            }
        }

        [HttpGet]
        [Authorize(Roles = Roles.Reader)]
        [ProducesResponseType(typeof(IEnumerable<GheOutputRequest>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<IEnumerable<GheOutputRequest>>> GetAll()
        {
            GheGetAllOutputDto dto = await getAllUseCase.Execute();
            List<GheOutputRequest> result = [];
            foreach (var ghe in dto.Ghes)
            {
                result.Add(GheOutputRequest.From(ghe));
            }
            return Ok(result);
        }

        [HttpPatch("{id}")]
        [Authorize(Roles = Roles.Editor)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Update(Guid id, GheUpdateInputRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var dto = new GheUpdateInputDto(id, request.Nome);
                await updateUseCase.Execute(dto);
                return NoContent();
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Roles.Editor)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                var dto = new GheDeleteInputDto(id);
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
