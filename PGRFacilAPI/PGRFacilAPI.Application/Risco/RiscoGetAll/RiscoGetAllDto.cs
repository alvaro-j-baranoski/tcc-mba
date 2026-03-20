using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Risco.RiscoGetAll
{
    public record RiscoGetAllDto : RiscoDto
    {
        public required Guid GheId { get; init; }
        public required string GheNome { get; init; }

        public static new RiscoGetAllDto From(RiscoEntity entity)
        {
            RiscoDto dto = RiscoDto.From(entity);
            
            return new RiscoGetAllDto
            {
                Id = dto.Id,
                Local = dto.Local,
                Atividades = dto.Atividades,
                Perigos = dto.Perigos,
                Danos = dto.Danos,
                Agentes = dto.Agentes,
                TipoDeAvaliacao = dto.TipoDeAvaliacao,
                Severidade = dto.Severidade,
                Probabilidade = dto.Probabilidade,
                Significancia = dto.Significancia,
                NivelSignificancia = dto.NivelSignificancia,
                PlanoDeAcao = dto.PlanoDeAcao,
                GheId = entity.GheId,
                GheNome = entity.GheNome ?? string.Empty
            };
        }
    }
}
