using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.User.UserDelete;
using PGRFacilAPI.Application.User.UserGetAll;
using PGRFacilAPI.Application.User.UserLogin;
using PGRFacilAPI.Application.User.UserRegister;
using PGRFacilAPI.Application.User.UserUpdate;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Presentation.Usuario
{
    [ApiController]
    [Route("API/Usuarios")]
    public class UsuarioController(UserRegisterUseCase registerUseCase,
        UserLoginUseCase loginUseCase,
        UserGetAllUseCase getAllUseCase,
        UserUpdateUseCase updateUseCase,
        UserDeleteUseCase deleteUseCase) : Controller
    {
        [HttpPost("Registrar")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register([FromBody] UsuarioRegisterInputRequest request)
        {
            try
            {
                var dto = new UserRegisterInputDto(request.Email, request.Senha);
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
        public async Task<ActionResult<UsuarioLoginOutputRequest>> Login([FromBody] UsuarioLoginInputRequest request)
        {
            try
            {
                var dto = new UserLoginInputDto(request.Email, request.Senha);
                UserLoginOutputDto result = await loginUseCase.Execute(dto);
                var output = new UsuarioLoginOutputRequest(result.Email, result.Token, result.Roles);
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
        public async Task<ActionResult<UsuarioGetAllOutputRequest>> GetAll()
        {
            UserGetAllOutputDto dto = await getAllUseCase.Execute();
            IEnumerable<UsuarioOutputRequest> users = dto.Users.Select(u => new UsuarioOutputRequest(u.Id, u.Email, u.Roles));
            return Ok(new UsuarioGetAllOutputRequest(users));
        }

        [HttpPatch("{id}")]
        [Authorize(Roles = Roles.Editor)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Update(Guid id, UsuarioUpdateInputRequest request)
        {
            try
            {
                var dto = new UserUpdateInputDto(id, request.Permissoes);
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

        [HttpDelete("{id}")]
        [Authorize(Roles = Roles.Editor)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                await deleteUseCase.Execute(new UserDeleteInputDto(id));
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
