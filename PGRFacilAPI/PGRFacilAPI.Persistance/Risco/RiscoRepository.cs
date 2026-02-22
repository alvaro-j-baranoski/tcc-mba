using Microsoft.EntityFrameworkCore;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Models;
using PGRFacilAPI.Application.Risco;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Persistance.Risco
{
    internal class RiscoRepository(AppDbContext dbContext) : IRiscoRepository
    {
        public async Task<RiscoEntity> Create(RiscoEntity risco)
        {
            RiscoTable riscoTable = RiscoMapper.MapToTable(risco);
            await dbContext.AddAsync(riscoTable);
            await dbContext.SaveChangesAsync();
            return risco;
        }

        public async Task Delete(Guid id)
        {
            RiscoTable riscoTable = await dbContext.Riscos.Where(r => r.Id == id)
                .FirstOrDefaultAsync() ?? throw new EntityNotFoundException();
            
            dbContext.Riscos.Remove(riscoTable);
            await dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<RiscoEntity>> GetAll(Guid gheId)
        {
            var riscoTables = await dbContext.Riscos.Where(r => r.GheId == gheId).ToListAsync();
            return riscoTables.Select(RiscoMapper.MapToEntity);
        }

        public async Task<RiscoEntity> GetById(Guid id)
        {
            RiscoTable riscoTable = await dbContext.Riscos.Where(r => r.Id == id)
                .FirstOrDefaultAsync() ?? throw new EntityNotFoundException();

            return RiscoMapper.MapToEntity(riscoTable);
        }

        public async Task<RiscoEntity> GetById(Guid gheId, Guid riscoId)
        {
            RiscoTable riscoTable = await dbContext.Riscos.Where(r => r.GheId == gheId && r.Id == riscoId)
                .FirstOrDefaultAsync() ?? throw new EntityNotFoundException();

            return RiscoMapper.MapToEntity(riscoTable);
        }

        public async Task Update(RiscoEntity risco)
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
    }
}
