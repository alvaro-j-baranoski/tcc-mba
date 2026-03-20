using PGRFacilAPI.Application.PlanoDeAcao;
using PGRFacilAPI.Domain.Enums;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Risco
{
    public record RiscoDto
    {
        public required Guid Id { get; init; }
        public required string Local { get; init; }
        public required string Atividades { get; init; }
        public required IEnumerable<string> Perigos { get; init; }
        public required IEnumerable<string> Danos { get; init; }
        public required AgentesDeRisco Agentes { get; init; }
        public required string TipoDeAvaliacao { get; init; }
        public required uint Severidade { get; init; }
        public required uint Probabilidade { get; init; }
        public required uint Significancia { get; init; }
        public required NivelSignificancia NivelSignificancia { get; init; }
        public required PlanoDeAcaoDto? PlanoDeAcao { get; init; } = null;

        /// <summary>
        /// Maps a <see cref="RiscoEntity"/> to create a <see cref="RiscoDto"/>.
        /// </summary>
        public static RiscoDto From(RiscoEntity entity)
        {
            PlanoDeAcaoDto? planoDeAcao = entity.PlanoDeAcao is null ? null : PlanoDeAcaoDto.From(entity.PlanoDeAcao);

            return new RiscoDto
            {
                Id = entity.Id,
                Local = entity.Local,
                Atividades = entity.Atividades,
                Perigos = entity.Perigos.Select(p => p.Descricao),
                Danos = entity.Danos.Select(d => d.Descricao),
                Agentes = entity.Agentes,
                TipoDeAvaliacao = entity.TipoDeAvaliacao,
                Severidade = entity.Severidade,
                Probabilidade = entity.Probabilidade,
                Significancia = entity.Significancia,
                NivelSignificancia = entity.NivelSignificancia,
                PlanoDeAcao = planoDeAcao,
            };
        }
    }
}
