using PGRFacilAPI.Domain.Enums;

namespace PGRFacilAPI.Presentation.Risco
{
    public record RiscoUpdateInputRequest(string Local, string Atividades, string Perigos, string Danos, AgentesDeRisco Agentes,
        string TipoDeAvaliacao, uint Severidade, uint Probabilidade);
}
