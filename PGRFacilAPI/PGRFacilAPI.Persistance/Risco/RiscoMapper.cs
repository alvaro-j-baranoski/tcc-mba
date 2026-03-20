using PGRFacilAPI.Domain.Models;
using PGRFacilAPI.Persistance.PlanoDeAcao;

namespace PGRFacilAPI.Persistance.Risco
{
    public static class RiscoMapper
    {
        public static RiscoEntity MapToEntity(RiscoTable table)
        {
            return new RiscoEntity
            {
                Id = table.Id,
                Local = table.Local,
                Atividades = table.Atividades,
                Perigos = table.Perigos.Select(p => new PerigoEntity
                {
                    Id = p.Id,
                    Descricao = p.Descricao
                }),
                Danos = table.Danos.Select(d => new DanoEntity
                {
                    Id = d.Id,
                    Descricao = d.Descricao
                }),
                Agentes = table.Agentes,
                TipoDeAvaliacao = table.TipoDeAvaliacao,
                Severidade = table.Severidade,
                Probabilidade = table.Probabilidade,
                GheId = table.GheId,
                GheNome = table.Ghe?.Nome,
                PlanoDeAcao = table.PlanoDeAcao is null ? null : PlanoDeAcaoMapper.MapToEntity(table.PlanoDeAcao)
            };
        }

        public static RiscoTable MapToTable(RiscoEntity entity)
        {
            return new RiscoTable
            {
                Id = entity.Id,
                Local = entity.Local,
                Atividades = entity.Atividades,
                Agentes = entity.Agentes,
                TipoDeAvaliacao = entity.TipoDeAvaliacao,
                Severidade = entity.Severidade,
                Probabilidade = entity.Probabilidade,
                GheId = entity.GheId,
                Perigos = [],
                Danos = []
            };
        }
    }
}
