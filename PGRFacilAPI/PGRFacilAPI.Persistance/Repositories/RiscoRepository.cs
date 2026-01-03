using Microsoft.EntityFrameworkCore;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Interfaces;
using PGRFacilAPI.Application.Models;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Persistance.Repositories
{
    internal class RiscoRepository(AppDbContext dbContext) : IRisksRepository
    {
        public async Task<Risco> Create(Risco risco)
        {
            await dbContext.AddAsync(risco);
            await dbContext.SaveChangesAsync();
            return risco;
        }

        public async Task Delete(Guid guid)
        {
            Risco risco = await GetByID(guid);
            dbContext.Riscos.Remove(risco);
            await dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Risco>> GetAll(Guid programaGuid)
        {
            return await dbContext.Riscos.Where(r => r.ProgramaID == programaGuid).ToListAsync();
        }

        public async Task<Risco> GetByID(Guid guid)
        {
            return await dbContext.Riscos.Where(r => r.Guid == guid).FirstOrDefaultAsync()
                ?? throw new EntityNotFoundException();
        }

        public async Task<Risco> GetByID(Guid programaGuid, Guid riscoGuid)
        {
            return await dbContext.Riscos.Where(r => r.ProgramaID == programaGuid && r.Guid == riscoGuid).FirstOrDefaultAsync()
                ?? throw new EntityNotFoundException();
        }


        public async Task<Risco> Update(Risco risco)
        {
            Risco riscoParaAtualizar = await GetByID(risco.Guid);
            riscoParaAtualizar.Local = risco.Local;
            riscoParaAtualizar.Atividades = risco.Atividades;
            riscoParaAtualizar.Perigos = risco.Perigos;
            riscoParaAtualizar.Danos = risco.Danos;
            riscoParaAtualizar.AgentesDeRisco = risco.AgentesDeRisco;
            riscoParaAtualizar.TipoDeAvaliacao = risco.TipoDeAvaliacao;
            riscoParaAtualizar.Severidade = risco.Severidade;
            riscoParaAtualizar.Probabilidade = risco.Probabilidade;

            dbContext.Entry(riscoParaAtualizar).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
            return riscoParaAtualizar;
        }

        public async Task<IEnumerable<SimplifiedRisk>> GetSimplifiedRisks()
        {
            List<Risco> riscos = await dbContext.Riscos.Select(risco => new Risco
            {
                AgentesDeRisco = risco.AgentesDeRisco,
                Severidade = risco.Severidade,
                Probabilidade = risco.Probabilidade
            }).ToListAsync();

            return riscos.Select(risco => new SimplifiedRisk
            {
                Agent = risco.AgentesDeRisco,
                SignificanceLevel = risco.NivelSignificancia
            });
        }
    }
}
