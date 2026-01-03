using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.DTOs;
using PGRFacilAPI.Application.DTOs.Users;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Services;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Presentation.Controllers
{
    [ApiController]
    [Route("API/Users")]
    public class UserController(IUserService userService) : Controller
    {
        [HttpPost("Register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register([FromBody] CreateUserDTO createUserDTO)
        {
            try
            {
                await userService.Register(createUserDTO);
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
        public async Task<ActionResult<LoginResponseDTO>> Login([FromBody] LoginRequestDTO userDTO)
        {
            try
            {
                return Ok(await userService.Login(userDTO));
            }
            catch (UserNotFoundException)
            {
                return Unauthorized();
            }
        }

        [HttpGet]
        [Authorize(Roles = Roles.Editor)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAll()
        {
            return Ok(await userService.GetAll());
        }

        [HttpPatch("{guid}")]
        [Authorize(Roles = Roles.Editor)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Update(Guid guid, UpdateUserDTO updateUserDTO)
        {
            try
            {
                await userService.Update(guid, updateUserDTO);
                return NoContent();
            }
            catch (UserNotFoundException)
            {
                return NotFound();
            }
            catch (DatabaseOperationException)
            {
                return BadRequest();
            }
        }

        [HttpDelete("{guid}")]
        [Authorize(Roles = Roles.Editor)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<UserDTO>> Delete(Guid guid)
        {
            try
            {
                await userService.Delete(guid);
                return NoContent();
            }
            catch (UserNotFoundException)
            {
                return NotFound();
            }
            catch (DatabaseOperationException)
            {
                return BadRequest();
            }
        }
    }
}
