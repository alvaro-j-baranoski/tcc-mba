using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.DTOs.Programs;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Services;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Presentation.Controllers
{
    [ApiController]
    [Route("API/Programs")]
    [Authorize]
    public class ProgramsController(IProgramsService programaService, UserManager<User> userManager) : Controller
    {
        [HttpPost]
        [Authorize(Roles = Roles.Editor)]
        [ProducesResponseType(typeof(ProgramDTO), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<ProgramDTO>> Create([FromBody] CreateProgramDTO createProgramaDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User? usuario = await userManager.GetUserAsync(User);

            if (usuario is null)
            {
                return BadRequest("Usuário não encontrado.");
            }

            ProgramDTO programaDTO = await programaService.Create(createProgramaDTO, usuario);
            return CreatedAtAction(nameof(Create), new { id = programaDTO.Guid}, programaDTO);
        }

        [HttpGet("{guid}")]
        [ProducesResponseType(typeof(ProgramDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProgramDTO>> GetByID(Guid guid)
        {
            try
            {
                User usuario = await GetUsuario();
                ProgramDTO programaDTO = await programaService.GetByID(guid, usuario);
                return Ok(programaDTO);
            }
            catch (EntityNotFoundException)
            {
                return NotFound(guid);
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<ProgramDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<IEnumerable<ProgramDTO>>> GetAll()
        {
            User usuario = await GetUsuario();
            IEnumerable<ProgramDTO> programas = await programaService.GetAll(usuario);
            return Ok(programas);
        }

        [HttpPut("{guid}")]
        [ProducesResponseType(typeof(ProgramDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProgramDTO>> Update(Guid guid, UpdateProgramDTO updateProgramaDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                User usuario = await GetUsuario();
                ProgramDTO programa = await programaService.Update(guid, updateProgramaDTO, usuario);
                return Ok(programa);
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(Guid guid)
        {
            try
            {
                User usuario = await GetUsuario();
                await programaService.Delete(guid, usuario);
                return NoContent();
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
        }

        private async Task<User> GetUsuario()
        {
            return await userManager.GetUserAsync(User) ?? throw new Exception();
        }
    }
}
