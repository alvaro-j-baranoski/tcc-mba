using PGRFacilAPI.Application.Risco;
using PGRFacilAPI.Domain.Enums;

namespace PGRFacilAPI.Presentation.Risco
{
    public record RiscoOutputRequest(Guid Id, string Local, string Atividades, IEnumerable<string> Perigos, IEnumerable<string> Danos, AgentesDeRisco Agentes,
        string TipoDeAvaliacao, uint Severidade, uint Probabilidade, uint Significancia, NivelSignificancia NivelSignificancia)
    {
        /// <summary>
        /// Maps a <see cref="RiscoDto"/> to a <see cref="RiscoOutputRequest"/>.
        /// </summary>
        public static RiscoOutputRequest From(RiscoDto dto)
        {
            return new RiscoOutputRequest(dto.Id, dto.Local, dto.Atividades, dto.Perigos, dto.Danos, dto.Agentes,
                dto.TipoDeAvaliacao, dto.Severidade, dto.Probabilidade, dto.Significancia, dto.NivelSignificancia);
        }
    }
}
