using PGRFacilAPI.Domain.Enums;

namespace PGRFacilAPI.Presentation.Relatorio
{
    public class MatrizDeRiscoOutputRequest
    {
        public required MatrizDeRiscoAgentesOutputRequest[] Agentes { get; set; }
    }

    public class MatrizDeRiscoAgentesOutputRequest
    {
        public AgentesDeRisco Agente { get; set; }
        public required MatrizDeRiscoSignificanciasOutputRequest[] Significancias { get; set; }
    }

    public class MatrizDeRiscoSignificanciasOutputRequest
    {
        public NivelSignificancia Significancia { get; set; }
        public uint NumeroDeRiscos { get; set; }
    }
}
