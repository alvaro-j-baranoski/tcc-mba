using PGRFacilAPI.Domain.Enums;

namespace PGRFacilAPI.Application.Models
{
    public class SimplifiedRisk
    {
        public AgentesDeRisco Agent { get; set; }
        public NivelSignificancia SignificanceLevel { get; set; }
    }
}
