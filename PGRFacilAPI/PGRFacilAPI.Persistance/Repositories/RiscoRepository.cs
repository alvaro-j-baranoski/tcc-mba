using Npgsql;
using PGRFacilAPI.Application.Interfaces;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Persistance.Repositories
{
    internal class RiscoRepository(AppDbContext dbContext) : IRiscoRepository
    {
        public async Task<Risco> Create(Risco risco)
        {
            await dbContext.AddAsync(risco);
            await dbContext.SaveChangesAsync();
            return risco;
        }
    }
}
