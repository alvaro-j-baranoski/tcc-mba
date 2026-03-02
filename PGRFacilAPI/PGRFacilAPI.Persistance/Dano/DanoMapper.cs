using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Persistance.Dano
{
    public static class DanoMapper
    {
        public static DanoEntity MapToEntity(DanoTable table)
        {
            return new DanoEntity
            {
                Id = table.Id,
                Descricao = table.Descricao,
            };
        }

        public static DanoTable MapToTable(DanoEntity entity)
        {
            return new DanoTable
            {
                Id = entity.Id,
                Descricao = entity.Descricao,
            };
        }
    }
}
