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
    public class RiscoController(IRiscoService riscoService, UserManager<Usuario> userManager) : Controller
    {
        [Authorize]
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CreateRiscoDTO createRiscoDTO)
        {
            RiscoDTO riscoDTO = await riscoService.Create(createRiscoDTO);
            return CreatedAtAction(nameof(Create), new { id = riscoDTO.Guid }, riscoDTO);
        }

        [Authorize]
        [HttpGet("{guid}")]
        public async Task<ActionResult<RiscoDTO>> GetByGuid(Guid guid)
        {
            var user = await userManager.GetUserAsync(User);
            Console.WriteLine($"Usuário autenticado: {user?.UserName}");

            RiscoDTO riscoDTO = await riscoService.GetByGuid(guid);
            return Ok(riscoDTO);
        }
    }
}
