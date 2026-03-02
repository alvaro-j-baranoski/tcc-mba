using Microsoft.EntityFrameworkCore;
using PGRFacilAPI.Application.Dano;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Persistance.Dano
{
    public class DanoRepository(AppDbContext dbContext) : IDanoRepository
    {
        public async Task<DanoEntity> Create(DanoEntity dano)
        {
            try
            {
                DanoTable danoTable = DanoMapper.MapToTable(dano);
                await dbContext.AddAsync(danoTable);
                await dbContext.SaveChangesAsync();
                return dano;
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is not null && ex.InnerException.Message.Contains("duplicate key"))
                {
                    throw new DatabaseOperationException();
                }
                throw;
            }
        }

        public async Task<DanoEntity> GetById(Guid id)
        {
            DanoTable danoTable = await dbContext.Danos.Where(d => d.Id == id)
                .FirstOrDefaultAsync() ?? throw new EntityNotFoundException();

            return DanoMapper.MapToEntity(danoTable);
        }

        public async Task<IEnumerable<DanoEntity>> GetAll()
        {
            var danoTables = await dbContext.Danos.ToListAsync();
            return danoTables.Select(DanoMapper.MapToEntity);
        }
    }
}
