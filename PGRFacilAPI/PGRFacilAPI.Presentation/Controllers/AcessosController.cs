using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.DTOs;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Services;

namespace PGRFacilAPI.Presentation.Controllers
{
    [ApiController]
    [Route("API/Acessos")]
    public class AcessosController(IAcessoService acessoService) : Controller
    {
        [HttpPost("Registrar")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register([FromBody] CreateUsuarioDTO createUsuarioDTO)
        {
            try
            {
                await acessoService.RegistrarUsuario(createUsuarioDTO);
                return Ok();
            }
            catch (InvalidOperationException)
            {
                return BadRequest();
            }
        }

        [HttpPost("Login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<LoginDTO>> Login([FromBody] UsuarioDTO usuarioDTO)
        {
            try
            {
                return Ok(await acessoService.Login(usuarioDTO));
            }
            catch (UserNotFoundException)
            {
                return Unauthorized();
            }
        }
    }
}
