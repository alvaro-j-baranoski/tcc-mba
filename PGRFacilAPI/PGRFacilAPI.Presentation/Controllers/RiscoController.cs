using Microsoft.AspNetCore.Mvc;
using PGRFacilAPI.Application.DTOs;
using PGRFacilAPI.Application.Services;

namespace PGRFacilAPI.Presentation.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RiscoController(IRiscoService riscoService) : Controller
    {
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CreateRiscoDTO createRiscoDTO)
        {
            RiscoDTO riscoDTO = await riscoService.Create(createRiscoDTO);
            return CreatedAtAction(nameof(Create), new { id = riscoDTO.Guid }, riscoDTO);
        }
    }
}
