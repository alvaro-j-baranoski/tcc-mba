using PGRFacilAPI.Application.Risco.RiscoGetAll;
using PGRFacilAPI.Presentation.Dano;
using PGRFacilAPI.Presentation.Perigo;
using PGRFacilAPI.Presentation.PlanoDeAcao;

namespace PGRFacilAPI.Presentation.Risco
{
    public record RiscoGetAllOutputRequest : RiscoOutputRequest
    {
        public required Guid GheId { get; init; }
        public required string GheNome { get; init; }

        public static RiscoGetAllOutputRequest From(RiscoGetAllDto dto)
        {
            PlanoDeAcaoOutputRequest? planoDeAcao = dto.PlanoDeAcao is null ? null : PlanoDeAcaoOutputRequest.From(dto.PlanoDeAcao);

            return new RiscoGetAllOutputRequest
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
                PlanoDeAcao = planoDeAcao,
                GheId = dto.GheId,
                GheNome = dto.GheNome,
            };
        }
    }
}
