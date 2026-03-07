using PGRFacilAPI.Application.PlanoDeAcao;
using PGRFacilAPI.Domain.Enums;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Risco
{
    public record RiscoDto(Guid Id, string Local, string Atividades, IEnumerable<string> Perigos, IEnumerable<string> Danos, AgentesDeRisco Agentes,
        string TipoDeAvaliacao, uint Severidade, uint Probabilidade, uint Significancia, NivelSignificancia NivelSignificancia, PlanoDeAcaoDto? PlanoDeAcao = null)
    {
        /// <summary>
        /// Maps a <see cref="RiscoEntity"/> to create a <see cref="RiscoDto"/>.
        /// </summary>
        public static RiscoDto From(RiscoEntity entity)
        {
            PlanoDeAcaoDto? planoDeAcao = null;
            if (entity.PlanoDeAcao is not null)
            {
                planoDeAcao = PlanoDeAcaoDto.From(entity.PlanoDeAcao);
            }

            return new RiscoDto(entity.Id,
                entity.Local,
                entity.Atividades,
                entity.Perigos.Select(p => p.Descricao),
                entity.Danos.Select(d => d.Descricao),
                entity.Agentes,
                entity.TipoDeAvaliacao,
                entity.Severidade,
                entity.Probabilidade,
                entity.Significancia,
                entity.NivelSignificancia,
                planoDeAcao);
        }
    }
}
