using PGRFacilAPI.Application.Perigo;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Persistance.Perigo
{
    public class PerigoRepository(AppDbContext dbContext) : IPerigoRepository
    {
        public async Task<PerigoEntity> Create(PerigoEntity perigo)
        {
            PerigoTable perigoTable = PerigoMapper.MapToTable(perigo);
            await dbContext.AddAsync(perigoTable);
            await dbContext.SaveChangesAsync();
            return perigo;
        }
    }
}
