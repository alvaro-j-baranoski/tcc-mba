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
    public class RiscoController(IRiscoService riscoService) : Controller
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
            RiscoDTO riscoDTO = await riscoService.GetByGuid(guid);
            return Ok(riscoDTO);
        }
    }
}
