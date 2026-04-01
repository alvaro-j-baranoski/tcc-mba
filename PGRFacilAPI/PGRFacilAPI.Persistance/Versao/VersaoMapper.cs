using PGRFacilAPI.Domain.Models;
using PGRFacilAPI.Persistance.Ghe;

namespace PGRFacilAPI.Persistance.Versao
{
    public static class VersaoMapper
    {
        public static VersaoEntity MapToEntity(VersaoTable table)
        {
            return new VersaoEntity
            {
                Id = table.Id,
                GheId = table.GheId,
                Versao = table.Versao,
                DataCriacao = table.DataCriacao,
                Observacoes = table.Observacoes,
            };
        }

        public static VersaoTable MapToTable(VersaoEntity entity, GheTable gheTable)
        {
            return new VersaoTable
            {
                Id = entity.Id,
                Versao = entity.Versao,
                DataCriacao = entity.DataCriacao,
                Observacoes = entity.Observacoes,
                GheId = entity.GheId,
                Ghe = gheTable
            };
        }
    }
}
