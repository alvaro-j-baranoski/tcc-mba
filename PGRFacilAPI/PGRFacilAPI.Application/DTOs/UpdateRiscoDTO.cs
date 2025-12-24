using PGRFacilAPI.Domain.Enums;

namespace PGRFacilAPI.Application.DTOs
{
    public class UpdateRiscoDTO
    {
        public required string Local { get; set; }
        public required string Atividades { get; set; }
        public required string Perigos { get; set; }
        public required string Danos { get; set; }
        public required AgentesDeRisco AgentesDeRisco { get; set; }
        public required string TipoDeAvaliacao { get; set; }
        public uint Severidade { get; set; }
        public uint Probabilidade { get; set; }
    }
}
