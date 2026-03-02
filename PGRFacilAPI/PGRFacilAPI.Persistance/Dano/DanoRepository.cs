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
    }
}
