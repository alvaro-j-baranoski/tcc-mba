using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.DTOs.Users;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Services;
using PGRFacilAPI.Application.User.UserDelete;
using PGRFacilAPI.Application.User.UserGetAll;
using PGRFacilAPI.Application.User.UserLogin;
using PGRFacilAPI.Application.User.UserRegister;
using PGRFacilAPI.Application.User.UserUpdate;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Presentation.User
{
    [ApiController]
    [Route("API/Users")]
    public class UserController(UserRegisterUseCase registerUseCase, 
        UserLoginUseCase loginUseCase, 
        UserGetAllUseCase getAllUseCase, 
        UserUpdateUseCase updateUseCase,
        UserDeleteUseCase deleteUseCase,
        IUserService userService) : Controller
    {
        [HttpPost("Register")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register([FromBody] UserRegisterInputRequest request)
        {
            try
            {
                var dto = new UserRegisterInputDto(request.Email, request.Password);
                await registerUseCase.Execute(dto);
                return NoContent();
            }
            catch (DatabaseOperationException)
            {
                return BadRequest();
            }
        }

        [HttpPost("Login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<UserLoginOutputRequest>> Login([FromBody] UserLoginInputRequest request)
        {
            try
            {
                var dto = new UserLoginInputDto(request.Email, request.Password);
                UserLoginOutputDto result = await loginUseCase.Execute(dto);
                var output = new UserLoginOutputRequest(result.Email, result.Token, result.Roles);
                return Ok(output);
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
        public async Task<ActionResult<UserGetAllOutputRequest>> GetAll()
        {
            UserGetAllOutputDto dto = await getAllUseCase.Execute();
            return Ok(new UserGetAllOutputRequest(dto.Users));
        }

        [HttpPatch("{guid}")]
        [Authorize(Roles = Roles.Editor)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Update(Guid guid, UserUpdateInputRequest request)
        {
            try
            {
                var dto = new UserUpdateInputDto(guid, request.Roles);
                await updateUseCase.Execute(dto);
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
        public async Task<IActionResult> Delete(Guid guid)
        {
            try
            {
                await deleteUseCase.Execute(new UserDeleteInputDto(guid));
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
