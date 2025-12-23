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

        public async Task<Risco> GetByGuid(Guid guid)
        {
            Risco? risco = await dbContext.Riscos.FindAsync(guid) 
                ?? throw new InvalidOperationException($"Risco com GUID {guid} não foi encontrado.");
            
            return risco;
        }
    }
}
