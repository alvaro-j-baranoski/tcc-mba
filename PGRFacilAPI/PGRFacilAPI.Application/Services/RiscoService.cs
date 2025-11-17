using PGRFacilAPI.Application.DTOs;

namespace PGRFacilAPI.Application.Services
{
    public class RiscoService : IRiscoService
    {
        public RiscoDTO Create(CreateRiscoDTO createRiscoDTO)
        {
            return new RiscoDTO
            {
                Guid = Guid.NewGuid(),
                Local = createRiscoDTO.Local,
                Atividades = createRiscoDTO.Atividades,
                Perigos = createRiscoDTO.Perigos,
                Danos = createRiscoDTO.Danos,
                AgenteDeRisco = createRiscoDTO.AgenteDeRisco,
                TipoDeAvaliacao = createRiscoDTO.TipoDeAvaliacao,
                Severidade = createRiscoDTO.Severidade,
                Probabilidade = createRiscoDTO.Probabilidade
            };
        }
    }
}
