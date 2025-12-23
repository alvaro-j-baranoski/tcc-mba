using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.DTOs;
using PGRFacilAPI.Application.Services;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Presentation.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProgramaController(IProgramaService programaService, UserManager<Usuario> userManager) : Controller
    {
        [Authorize]
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CreateProgramaDTO createProgramaDTO)
        {
            Usuario? usuario = await userManager.GetUserAsync(User);

            if (usuario is null)
            {
                return BadRequest("Usuário não encontrado.");
            }

            ProgramaDTO programaDTO = await programaService.Create(createProgramaDTO, usuario);
            return CreatedAtAction(nameof(Create), new { id = programaDTO.Guid}, programaDTO);
        }
    }
}
