using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Persistance.Perigo
{
    public static class PerigoMapper
    {
        public static PerigoEntity MapToEntity(PerigoTable table)
        {
            return new PerigoEntity
            {
                Id = table.Id,
                Descricao = table.Descricao,
            };
        }

        public static PerigoTable MapToTable(PerigoEntity entity)
        {
            return new PerigoTable
            {
                Id = entity.Id,
                Descricao = entity.Descricao,
            };
        }
    }
}
