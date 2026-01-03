using PGRFacilAPI.Domain.Enums;

namespace PGRFacilAPI.Application.DTOs.Risks
{
    public class UpdateRiskDTO
    {
        public required string Local { get; set; }
        public required string Activites { get; set; }
        public required string Dangers { get; set; }
        public required string Damages { get; set; }
        public required AgentesDeRisco Agent { get; set; }
        public required string AssessementType { get; set; }
        public uint Severity { get; set; }
        public uint Probability { get; set; }
    }
}
