using Microsoft.EntityFrameworkCore;
using PGRFacilAPI.Application.Exceptions;
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

        public async Task<PerigoEntity> GetById(Guid id)
        {
            PerigoTable perigoTable = await dbContext.Perigos.Where(p => p.Id == id)
                .FirstOrDefaultAsync() ?? throw new EntityNotFoundException();

            return PerigoMapper.MapToEntity(perigoTable);
        }

        public async Task<IEnumerable<PerigoEntity>> GetAll()
        {
            var perigoTables = await dbContext.Perigos.ToListAsync();
            return perigoTables.Select(PerigoMapper.MapToEntity);
        }
    }
}
