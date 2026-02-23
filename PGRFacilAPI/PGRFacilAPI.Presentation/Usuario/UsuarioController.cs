using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Usuario.UsuarioDelete;
using PGRFacilAPI.Application.Usuario.UsuarioGetAll;
using PGRFacilAPI.Application.Usuario.UsuarioLogin;
using PGRFacilAPI.Application.Usuario.UsuarioRegister;
using PGRFacilAPI.Application.Usuario.UsuarioUpdate;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Presentation.Usuario
{
    [ApiController]
    [Route("API/Usuarios")]
    public class UsuarioController(UsuarioRegisterUseCase registerUseCase,
        UsuarioLoginUseCase loginUseCase,
        UsuarioGetAllUseCase getAllUseCase,
        UsuarioUpdateUseCase updateUseCase,
        UsuarioDeleteUseCase deleteUseCase) : Controller
    {
        [HttpPost("Registrar")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register([FromBody] UsuarioRegisterInputRequest request)
        {
            try
            {
                var dto = new UsuarioRegisterInputDto(request.Email, request.Senha);
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
                var dto = new UsuarioLoginInputDto(request.Email, request.Senha);
                UsuarioLoginOutputDto result = await loginUseCase.Execute(dto);
                var output = new UsuarioLoginOutputRequest(result.Email, result.Token, result.Permissoes);
                return Ok(output);
            }
            catch (UserNotFoundException)
            {
                return Unauthorized();
            }
        }

        [HttpGet]
        [Authorize(Roles = Permissoes.Editor)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<UsuarioGetAllOutputRequest>> GetAll()
        {
            UsuarioGetAllOutputDto dto = await getAllUseCase.Execute();
            IEnumerable<UsuarioOutputRequest> users = dto.Users.Select(u => new UsuarioOutputRequest(u.Id, u.Email, u.Permissoes));
            return Ok(new UsuarioGetAllOutputRequest(users));
        }

        [HttpPatch("{id}")]
        [Authorize(Roles = Permissoes.Editor)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Update(Guid id, UsuarioUpdateInputRequest request)
        {
            try
            {
                var dto = new UsuarioUpdateInputDto(id, request.Permissoes);
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
        [Authorize(Roles = Permissoes.Editor)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                await deleteUseCase.Execute(new UsuarioDeleteInputDto(id));
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
