using PGRFacilAPI.Domain.Models;

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
    }
}
