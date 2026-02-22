using PGRFacilAPI.Domain.Models;

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
                Perigos = table.Perigos,
                Danos = table.Danos,
                Agentes = table.Agentes,
                TipoDeAvaliacao = table.TipoDeAvaliacao,
                Severidade = table.Severidade,
                Probabilidade = table.Probabilidade,
                GheId = table.GheId,
            };
        }

        public static RiscoTable MapToTable(RiscoEntity entity)
        {
            return new RiscoTable
            {
                Id = entity.Id,
                Local = entity.Local,
                Atividades = entity.Atividades,
                Perigos = entity.Perigos,
                Danos = entity.Danos,
                Agentes = entity.Agentes,
                TipoDeAvaliacao = entity.TipoDeAvaliacao,
                Severidade = entity.Severidade,
                Probabilidade = entity.Probabilidade,
                GheId = entity.GheId,
            };
        }
    }
}
