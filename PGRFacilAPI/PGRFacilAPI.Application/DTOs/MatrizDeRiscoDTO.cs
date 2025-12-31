using PGRFacilAPI.Domain.Enums;

namespace PGRFacilAPI.Application.DTOs
{
    public class MatrizDeRiscoDTO
    {
        public MatrizDeRiscoAgentes[] Agentes { get; private set; } = [
            new MatrizDeRiscoAgentes { Agente = AgentesDeRisco.Acidente },
            new MatrizDeRiscoAgentes { Agente = AgentesDeRisco.Biologico },
            new MatrizDeRiscoAgentes { Agente = AgentesDeRisco.Ergonomico },
            new MatrizDeRiscoAgentes { Agente = AgentesDeRisco.ErgonomicoPsicossocial },
            new MatrizDeRiscoAgentes { Agente = AgentesDeRisco.Fisico },
            new MatrizDeRiscoAgentes { Agente = AgentesDeRisco.Quimico },
        ];
    }

    public class MatrizDeRiscoAgentes
    {
        public AgentesDeRisco Agente { get; set; }
        public MatrizDeRiscoSignificancias[] Significancias { get; set; } = [
            new MatrizDeRiscoSignificancias { Significancia = NivelSignificancia.Baixo },
            new MatrizDeRiscoSignificancias { Significancia = NivelSignificancia.Medio },
            new MatrizDeRiscoSignificancias { Significancia = NivelSignificancia.Alto },
        ];
    }

    public class MatrizDeRiscoSignificancias
    {
        public NivelSignificancia Significancia { get; set; }
        public uint NumeroDeRiscos { get; set; }
    }
}
