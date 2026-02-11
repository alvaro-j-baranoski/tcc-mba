using Microsoft.EntityFrameworkCore;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Interfaces;
using PGRFacilAPI.Application.Models;
using PGRFacilAPI.Domain.Models;
using PGRFacilAPI.Persistance.Ghe;
using PGRFacilAPI.Persistance.Risco;

namespace PGRFacilAPI.Persistance.Repositories
{
    internal class RiscoRepository(AppDbContext dbContext) : IRisksRepository
    {
        public async Task<RiscoEntity> Create(RiscoEntity risco)
        {
            RiscoTable riscoTable = MapToRiscoTable(risco);
            await dbContext.AddAsync(riscoTable);
            await dbContext.SaveChangesAsync();
            return risco;
        }

        public async Task Delete(Guid guid)
        {
            RiscoTable riscoTable = await dbContext.Riscos.Where(r => r.Id == guid)
                .FirstOrDefaultAsync() ?? throw new EntityNotFoundException();
            dbContext.Riscos.Remove(riscoTable);
            await dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<RiscoEntity>> GetAll(Guid programaGuid)
        {
            var riscoTables = await dbContext.Riscos.Where(r => r.GheId == programaGuid).ToListAsync();
            return riscoTables.Select(MapToRiscoEntity);
        }

        public async Task<RiscoEntity> GetByID(Guid guid)
        {
            RiscoTable riscoTable = await dbContext.Riscos.Where(r => r.Id == guid).FirstOrDefaultAsync()
                ?? throw new EntityNotFoundException();

            return MapToRiscoEntity(riscoTable);
        }

        public async Task<RiscoEntity> GetByID(Guid gheId, Guid riscoId)
        {
            RiscoTable riscoTable = await dbContext.Riscos.Where(r => r.GheId == gheId && r.Id == riscoId)
                .FirstOrDefaultAsync() ?? 
                throw new EntityNotFoundException();

            return MapToRiscoEntity(riscoTable);
        }

        public async Task<RiscoEntity> Update(RiscoEntity risco)
        {
            RiscoTable riscoTable = await dbContext.Riscos.Where(r => r.Id == risco.Id)
                .FirstOrDefaultAsync() ?? throw new EntityNotFoundException();

            riscoTable.Local = risco.Local;
            riscoTable.Atividades = risco.Atividades;
            riscoTable.Perigos = risco.Perigos;
            riscoTable.Danos = risco.Danos;
            riscoTable.Agentes = risco.Agentes;
            riscoTable.TipoDeAvaliacao = risco.TipoDeAvaliacao;
            riscoTable.Severidade = risco.Severidade;
            riscoTable.Probabilidade = risco.Probabilidade;

            dbContext.Riscos.Update(riscoTable);
            await dbContext.SaveChangesAsync();
            return MapToRiscoEntity(riscoTable);
        }

        public async Task<IEnumerable<SimplifiedRisk>> GetSimplifiedRisks()
        {
            List<RiscoEntity> riscos = await dbContext.Riscos.Select(risco => new RiscoEntity
            {
                Agentes = risco.Agentes,
                Severidade = risco.Severidade,
                Probabilidade = risco.Probabilidade
            }).ToListAsync();

            return riscos.Select(risco => new SimplifiedRisk
            {
                Agent = risco.Agentes,
                SignificanceLevel = risco.NivelSignificancia
            });
        }
    
        private static RiscoTable MapToRiscoTable(RiscoEntity entity)
        {
            return new RiscoTable
            {
                Id = entity.Id,
                Local = entity.Local,
                Atividades = entity.Atividades,
                Perigos = entity.Perigos,
                Danos = entity.Danos,
                Agentes = entity.Agentes,
                TipoDeAvaliacao = entity.TipoDeAvaliacao,
                Severidade = entity.Severidade,
                Probabilidade = entity.Probabilidade,
                GheId = entity.GheId,
            };
        }

        private static RiscoEntity MapToRiscoEntity(RiscoTable table)
        {
            return new RiscoEntity
            {
                Id = table.Id,
                Local = table.Local,
                Atividades = table.Atividades,
                Perigos = table.Perigos,
                Danos = table.Danos,
                Agentes = table.Agentes,
                TipoDeAvaliacao = table.TipoDeAvaliacao,
                Severidade = table.Severidade,
                Probabilidade = table.Probabilidade,
                GheId = table.GheId,
            };
        }
    }
}
