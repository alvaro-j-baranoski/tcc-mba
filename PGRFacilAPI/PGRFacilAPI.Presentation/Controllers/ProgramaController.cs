using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.DTOs;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Services;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Presentation.Controllers
{
    [ApiController]
    [Route("API/Programas")]
    [Authorize]
    public class ProgramaController(IProgramaService programaService, UserManager<Usuario> userManager) : Controller
    {
        [HttpPost]
        [ProducesResponseType(typeof(ProgramaDTO), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<ProgramaDTO>> Create([FromBody] CreateProgramaDTO createProgramaDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Usuario? usuario = await userManager.GetUserAsync(User);

            if (usuario is null)
            {
                return BadRequest("Usuário não encontrado.");
            }

            ProgramaDTO programaDTO = await programaService.Create(createProgramaDTO, usuario);
            return CreatedAtAction(nameof(Create), new { id = programaDTO.Guid}, programaDTO);
        }

        [HttpGet("{guid}")]
        [ProducesResponseType(typeof(ProgramaDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProgramaDTO>> GetByID(Guid guid)
        {
            try
            {
                Usuario usuario = await GetUsuario();
                ProgramaDTO programaDTO = await programaService.GetByID(guid, usuario);
                return Ok(programaDTO);
            }
            catch (EntityNotFoundException)
            {
                return NotFound(guid);
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<ProgramaDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<IEnumerable<ProgramaDTO>>> GetAll()
        {
            Usuario usuario = await GetUsuario();
            IEnumerable<ProgramaDTO> programas = await programaService.GetAll(usuario);
            return Ok(programas);
        }

        [HttpPut("{guid}")]
        [ProducesResponseType(typeof(ProgramaDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProgramaDTO>> Update(Guid guid, UpdateProgramaDTO updateProgramaDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                Usuario usuario = await GetUsuario();
                ProgramaDTO programa = await programaService.Update(guid, updateProgramaDTO, usuario);
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
                Usuario usuario = await GetUsuario();
                await programaService.Delete(guid, usuario);
                return NoContent();
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
        }

        private async Task<Usuario> GetUsuario()
        {
            return await userManager.GetUserAsync(User) ?? throw new Exception();
        }
    }
}
