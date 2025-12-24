using Microsoft.EntityFrameworkCore;
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

        public async Task<Risco> GetByID(Guid programaGuid, Guid riscoGuid)
        {
            return await dbContext.Riscos.Where(r => r.ProgramaID == programaGuid && r.Guid == riscoGuid).FirstOrDefaultAsync() 
                ?? throw new InvalidOperationException($"Risco com GUID {riscoGuid} não foi encontrado.");
        }
    }
}
