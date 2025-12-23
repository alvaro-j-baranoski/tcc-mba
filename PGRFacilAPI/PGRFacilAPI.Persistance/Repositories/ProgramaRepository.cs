using PGRFacilAPI.Application.Interfaces;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Persistance.Repositories
{
    public class ProgramaRepository(AppDbContext dbContext) : IProgramaRepository
    {
        public async Task<Programa> Create(Programa programa)
        {
            await dbContext.AddAsync(programa);
            await dbContext.SaveChangesAsync();
            return programa;
        }
    }
}
