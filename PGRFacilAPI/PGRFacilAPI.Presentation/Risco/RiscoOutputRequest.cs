using PGRFacilAPI.Application.Risco;
using PGRFacilAPI.Domain.Enums;
using PGRFacilAPI.Presentation.Dano;
using PGRFacilAPI.Presentation.Perigo;
using PGRFacilAPI.Presentation.PlanoDeAcao;

namespace PGRFacilAPI.Presentation.Risco
{
    public record RiscoOutputRequest
    {
        public required Guid Id { get; init; }
        public required string Local { get; init; }
        public required string Atividades { get; init; }
        public required IEnumerable<PerigoOutputRequest> Perigos { get; init; }
        public required IEnumerable<DanoOutputRequest> Danos { get; init; }
        public required AgentesDeRisco Agentes { get; init; }
        public required string TipoDeAvaliacao { get; init; }
        public required uint Severidade { get; init; }
        public required uint Probabilidade { get; init; }
        public required uint Significancia { get; init; }
        public required NivelSignificancia NivelSignificancia { get; init; }
        public required PlanoDeAcaoOutputRequest? PlanoDeAcao { get; init; } = null;

        /// <summary>
        /// Maps a <see cref="RiscoDto"/> to a <see cref="RiscoOutputRequest"/>.
        /// </summary>
        public static RiscoOutputRequest From(RiscoDto dto)
        {
            PlanoDeAcaoOutputRequest? planoDeAcao = dto.PlanoDeAcao is null ? null : PlanoDeAcaoOutputRequest.From(dto.PlanoDeAcao);

            return new RiscoOutputRequest
            {
                Id = dto.Id,
                Local = dto.Local,
                Atividades = dto.Atividades,
                Perigos = dto.Perigos.Select(p => new PerigoOutputRequest(p.Id, p.Descricao)),
                Danos = dto.Danos.Select(d => new DanoOutputRequest(d.Id, d.Descricao)),
                Agentes = dto.Agentes,
                TipoDeAvaliacao = dto.TipoDeAvaliacao,
                Severidade = dto.Severidade,
                Probabilidade = dto.Probabilidade,
                Significancia = dto.Significancia,
                NivelSignificancia = dto.NivelSignificancia,
                PlanoDeAcao = planoDeAcao
            };
        }
    }
}
