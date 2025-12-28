using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.DTOs;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Services;
using PGRFacilAPI.Domain.Models;
using System;

namespace PGRFacilAPI.Presentation.Controllers
{
    [ApiController]
    [Route("API/Programas/{programaGuid}/Riscos")]
    [Authorize]
    public class RiscoController(IRiscoService riscoService, UserManager<Usuario> userManager) : Controller
    {
        [HttpPost]
        [ProducesResponseType(typeof(RiscoDTO), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<RiscoDTO>> Create(Guid programaGuid, [FromBody] CreateRiscoDTO createRiscoDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                Usuario usuario = await GetUsuario();
                RiscoDTO riscoDTO = await riscoService.Create(usuario, programaGuid, createRiscoDTO);
                return CreatedAtAction(nameof(Create), new { id = riscoDTO.Guid }, riscoDTO);
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
            catch (UserForbiddenException)
            {
                return Forbid();
            }
        }

        [HttpGet("{riscoGuid}")]
        [ProducesResponseType(typeof(RiscoDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<RiscoDTO>> GetByID(Guid programaGuid, Guid riscoGuid)
        {
            try
            {
                Usuario usuario = await GetUsuario();
                RiscoDTO riscoDTO = await riscoService.GetByID(usuario, programaGuid, riscoGuid);
                return Ok(riscoDTO);
            }
            catch (EntityNotFoundException)
            {
                return NotFound(riscoGuid);
            }
            catch (UserForbiddenException)
            {
                return Forbid();
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<RiscoDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<IEnumerable<RiscoDTO>>> GetAll(Guid programaGuid)
        {
            try
            {
                Usuario usuario = await GetUsuario();
                IEnumerable<RiscoDTO> riscos = await riscoService.GetAll(usuario, programaGuid);
                return Ok(riscos);
            }
            catch (EntityNotFoundException)
            {
                return NotFound(programaGuid);
            }
            catch (UserForbiddenException)
            {
                return Forbid();
            }
        }

        [HttpPut("{riscoGuid}")]
        [ProducesResponseType(typeof(ProgramaDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<RiscoDTO>> Update(Guid programaGuid, Guid riscoGuid, UpdateRiscoDTO updateRiscoDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                Usuario usuario = await GetUsuario();
                RiscoDTO risco = await riscoService.Update(usuario, programaGuid, riscoGuid, updateRiscoDTO);
                return Ok(risco);
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
            catch (UserForbiddenException)
            {
                return Forbid();
            }
        }

        [HttpDelete("{riscoGuid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(Guid programaGuid, Guid riscoGuid)
        {
            try
            {
                Usuario usuario = await GetUsuario();
                await riscoService.Delete(usuario, programaGuid, riscoGuid);
                return NoContent();
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
            catch (UserForbiddenException)
            {
                return Forbid();
            }
        }

        private async Task<Usuario> GetUsuario()
        {
            return await userManager.GetUserAsync(User) ?? throw new Exception();
        }
    }
}
