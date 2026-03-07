using PGRFacilAPI.Domain.Models;
using PGRFacilAPI.Persistance.Risco;

namespace PGRFacilAPI.Persistance.PlanoDeAcao
{
    public static class PlanoDeAcaoMapper
    {
        public static PlanoDeAcaoEntity MapToEntity(PlanoDeAcaoTable table)
        {
            return new PlanoDeAcaoEntity
            {
                Id = table.Id,
                Responsavel = table.Responsavel,
                DataInicio = table.DataInicio,
                DataConclusao = table.DataConclusao,
                Descricao = table.Descricao,
            };
        }

        public static PlanoDeAcaoTable MapToTable(PlanoDeAcaoEntity entity, Guid riscoId, RiscoTable riscoTable)
        {
            return new PlanoDeAcaoTable
            {
                Id = entity.Id,
                Responsavel = entity.Responsavel,
                DataInicio = entity.DataInicio,
                DataConclusao = entity.DataConclusao,
                Descricao = entity.Descricao,
                RiscoId = riscoId,
                Risco = riscoTable
            };
        }
    }
}
