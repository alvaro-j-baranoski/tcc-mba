using PGRFacilAPI.Domain.Enums;

namespace PGRFacilAPI.Application.Models
{
    public class SimplifiedRisco
    {
        public AgentesDeRisco Agente { get; set; }
        public NivelSignificancia NivelSignificancia { get; set; }
    }
}
