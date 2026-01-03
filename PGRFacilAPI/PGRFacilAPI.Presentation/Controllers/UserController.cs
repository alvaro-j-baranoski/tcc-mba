using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.DTOs;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Services;

namespace PGRFacilAPI.Presentation.Controllers
{
    [ApiController]
    [Route("API/Users")]
    public class UserController(IUserService userService) : Controller
    {
        [HttpPost("Register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register([FromBody] CreateUserDTO createUsuarioDTO)
        {
            try
            {
                await userService.Register(createUsuarioDTO);
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
                return Ok(await userService.Login(usuarioDTO));
            }
            catch (UserNotFoundException)
            {
                return Unauthorized();
            }
        }
    }
}
