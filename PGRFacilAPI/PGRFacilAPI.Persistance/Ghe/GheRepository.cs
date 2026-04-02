using Microsoft.EntityFrameworkCore;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Ghe;
using PGRFacilAPI.Domain.Models;
using PGRFacilAPI.Persistance.Risco;

namespace PGRFacilAPI.Persistance.Ghe
{
    public class GheRepository(AppDbContext dbContext) : IGheRepository
    {
        public async Task<GheEntity> Create(GheEntity ghe)
        {
            GheTable gheTable = MapToGheTable(ghe);
            await dbContext.AddAsync(gheTable);
            await dbContext.SaveChangesAsync();
            return ghe;
        }

        public async Task Delete(Guid id)
        {
            GheEntity entity = await GetById(id);
            dbContext.Ghes.Remove(MapToGheTable(entity));
            await dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<GheEntity>> GetAll()
        {
            return await dbContext.Ghes
                .Include(p => p.Versoes)
                .Select(p => new GheEntity
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    AtualizadoEm = p.AtualizadoEm,
                    Riscos = p.Riscos.Select(r => RiscoMapper.MapToEntity(r)),
                    Versao = GetLatestVersion(p)
                })
                .ToListAsync();
        }

        public async Task<GheEntity> GetById(Guid guid)
        {
            return await dbContext.Ghes
                .Where(p => p.Id == guid)
                .Include(p => p.Versoes)
                .Select(p => new GheEntity
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    AtualizadoEm = p.AtualizadoEm,
                    Riscos = p.Riscos.Select(r => RiscoMapper.MapToEntity(r)),
                    Versao = GetLatestVersion(p)
                })
                .FirstOrDefaultAsync() ?? throw new EntityNotFoundException();
        }

        public async Task Update(Guid id, GheEntity entity)
        {
            GheEntity gheToUpdate = await GetById(id);
            GheTable gheTable = MapToGheTable(gheToUpdate);
            gheTable.Nome = entity.Nome;
            gheTable.AtualizadoEm = entity.AtualizadoEm;
            dbContext.Entry(gheTable).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
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

        private static Version GetLatestVersion(GheTable table)
        {
            var versoes = table.Versoes.Select(v => v.Versao);
            return versoes
                .Select(v => new Version(v))
                .OrderDescending()
                .FirstOrDefault() ?? new Version(0, 0);
        }
    }
}
