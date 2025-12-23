using Microsoft.EntityFrameworkCore;
using PGRFacilAPI.Application.Exceptions;
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

        public async Task Delete(Guid guid, string usuarioID)
        {
            Programa programa = await GetByID(guid, usuarioID);
            dbContext.Programas.Remove(programa);
            await dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Programa>> GetAll(string usuarioID)
        {
            return await dbContext.Programas.Where(p => p.UsuarioID == usuarioID).ToListAsync();
        }

        public async Task<Programa> GetByID(Guid guid, string usuarioID)
        {
            return await dbContext.Programas.FirstOrDefaultAsync(p => p.Guid == guid && p.UsuarioID == usuarioID) ??
                throw new EntityNotFoundException();
        }

        public async Task<Programa> Update(Guid guid, Programa programa, string usuarioID)
        {
            Programa programaParaAtualizar = await GetByID(guid, usuarioID);
            programaParaAtualizar.Nome = programa.Nome;
            dbContext.Entry(programaParaAtualizar).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
            return programaParaAtualizar;
        }
    }
}
