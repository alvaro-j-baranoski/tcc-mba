using PGRFacilAPI.Domain.Enums;

namespace PGRFacilAPI.Application.DTOs.Reports
{
    public class RiskMatrixDTO
    {
        public RiskMatrixAgents[] Agents { get; private set; } = [
            new RiskMatrixAgents { Agent = AgentesDeRisco.Acidente },
            new RiskMatrixAgents { Agent = AgentesDeRisco.Biologico },
            new RiskMatrixAgents { Agent = AgentesDeRisco.Ergonomico },
            new RiskMatrixAgents { Agent = AgentesDeRisco.ErgonomicoPsicossocial },
            new RiskMatrixAgents { Agent = AgentesDeRisco.Fisico },
            new RiskMatrixAgents { Agent = AgentesDeRisco.Quimico },
        ];
    }

    public class RiskMatrixAgents
    {
        public AgentesDeRisco Agent { get; set; }
        public RiskMatrixSignificances[] Significances { get; set; } = [
            new RiskMatrixSignificances { Significance = NivelSignificancia.Baixo },
            new RiskMatrixSignificances { Significance = NivelSignificancia.Medio },
            new RiskMatrixSignificances { Significance = NivelSignificancia.Alto },
        ];
    }

    public class RiskMatrixSignificances
    {
        public NivelSignificancia Significance { get; set; }
        public uint NumberOfRisks { get; set; }
    }
}
