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
    [Route("API/Programas/{programaGuid}/Riscos")]
    [Authorize]
    public class RiscoController(IRiscoService riscoService, UserManager<Usuario> userManager) : Controller
    {
        [HttpPost]
        [ProducesResponseType(typeof(RiscoDTO), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
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
        }

        [Authorize]
        [HttpGet("{guid}")]
        public async Task<ActionResult<RiscoDTO>> GetByGuid(Guid guid)
        {
            RiscoDTO riscoDTO = await riscoService.GetByGuid(guid);
            return Ok(riscoDTO);
        }

        private async Task<Usuario> GetUsuario()
        {
            return await userManager.GetUserAsync(User) ?? throw new Exception();
        }
    }
}
