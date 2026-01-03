using Microsoft.EntityFrameworkCore;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Interfaces;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Persistance.Repositories
{
    public class ProgramaRepository(AppDbContext dbContext) : IProgramsRepository
    {
        public async Task<Programa> Create(Programa program)
        {
            await dbContext.AddAsync(program);
            await dbContext.SaveChangesAsync();
            return program;
        }

        public async Task Delete(Guid guid)
        {
            Programa program = await GetByID(guid) ?? throw new EntityNotFoundException();
            dbContext.Programas.Remove(program);
            await dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Programa>> GetAll()
        {
            return await dbContext.Programas
                .Select(p => new Programa
                {
                    Guid = p.Guid,
                    Nome = p.Nome,
                    AtualizadoEm = p.AtualizadoEm,
                    UsuarioID = p.UsuarioID,
                    NumeroDeRiscos = p.Riscos.Count
                })
                .ToListAsync();
        }

        public async Task<Programa?> GetByID(Guid guid)
        {
            return await dbContext.Programas
                .Where(p => p.Guid == guid)
                .Select(p => new Programa
                {
                    Guid = p.Guid,
                    Nome = p.Nome,
                    AtualizadoEm = p.AtualizadoEm,
                    UsuarioID = p.UsuarioID,
                    NumeroDeRiscos = p.Riscos.Count
                })
                .FirstOrDefaultAsync();
        }

        public async Task<Programa> Update(Guid guid, Programa programa, string usuarioID)
        {
            Programa programaParaAtualizar = await GetByID(guid) ?? throw new EntityNotFoundException();
            programaParaAtualizar.Nome = programa.Nome;
            programaParaAtualizar.AtualizadoEm = programa.AtualizadoEm;
            dbContext.Entry(programaParaAtualizar).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
            return programaParaAtualizar;
        }

        public async Task UpdateDateTime(Guid guid, DateTime dateTime)
        {
            await dbContext.Programas
                .Where(p => p.Guid == guid)
                .ExecuteUpdateAsync(s => s.SetProperty(p => p.AtualizadoEm, dateTime));
        }
    }
}
