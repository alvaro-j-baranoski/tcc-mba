using PGRFacilAPI.Domain.Enums;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Risco
{
    public record RiscoDto(Guid Id, string Local, string Atividades, string Perigos, string Danos, AgentesDeRisco Agentes,
        string TipoDeAvaliacao, uint Severidade, uint Probabilidade, uint Significancia, NivelSignificancia NivelSignificancia)
    {
        /// <summary>
        /// Maps a <see cref="RiscoEntity"/> to create a <see cref="RiscoDto"/>.
        /// </summary>
        public static RiscoDto From(RiscoEntity entity)
        {
            return new RiscoDto(entity.Id, entity.Local, entity.Atividades, entity.Perigos, entity.Danos, entity.Agentes,
                entity.TipoDeAvaliacao, entity.Severidade, entity.Probabilidade, entity.Significancia, entity.NivelSignificancia);
        }
    }
}
