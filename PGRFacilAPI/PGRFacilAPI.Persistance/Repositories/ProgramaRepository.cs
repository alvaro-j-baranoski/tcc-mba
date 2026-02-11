using Microsoft.EntityFrameworkCore;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Interfaces;
using PGRFacilAPI.Domain.Models;
using PGRFacilAPI.Persistance.Ghe;

namespace PGRFacilAPI.Persistance.Repositories
{
    public class ProgramaRepository(AppDbContext dbContext) : IProgramsRepository
    {
        public async Task<GheEntity> Create(GheEntity program)
        {
            GheTable gheTable = MapToGheTable(program);
            await dbContext.AddAsync(gheTable);
            await dbContext.SaveChangesAsync();
            return program;
        }

        public async Task Delete(Guid guid)
        {
            GheEntity program = await GetByID(guid) ?? throw new EntityNotFoundException();
            dbContext.Ghes.Remove(MapToGheTable(program));
            await dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<GheEntity>> GetAll()
        {
            return await dbContext.Ghes
                .Select(p => new GheEntity
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    AtualizadoEm = p.AtualizadoEm,
                })
                .ToListAsync();
        }

        public async Task<GheEntity?> GetByID(Guid guid)
        {
            return await dbContext.Ghes
                .Where(p => p.Id == guid)
                .Select(p => new GheEntity
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    AtualizadoEm = p.AtualizadoEm,
                })
                .FirstOrDefaultAsync();
        }

        public async Task<GheEntity> Update(Guid guid, GheEntity programa)
        {
            GheEntity programaParaAtualizar = await GetByID(guid) ?? throw new EntityNotFoundException();
            GheTable gheTable = MapToGheTable(programaParaAtualizar);
            gheTable.Nome = programa.Nome;
            gheTable.AtualizadoEm = programa.AtualizadoEm;
            dbContext.Entry(gheTable).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
            return programaParaAtualizar;
        }

        public async Task UpdateDateTime(Guid guid, DateTime dateTime)
        {
            await dbContext.Ghes
                .Where(p => p.Id == guid)
                .ExecuteUpdateAsync(s => s.SetProperty(p => p.AtualizadoEm, dateTime));
        }

        private static GheTable MapToGheTable(GheEntity entity)
        {
            return new GheTable
            {
                Id = entity.Id,
                Nome = entity.Nome,
                AtualizadoEm = entity.AtualizadoEm
            };
        }
    }
}
