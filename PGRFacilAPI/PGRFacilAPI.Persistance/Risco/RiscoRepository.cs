using Microsoft.EntityFrameworkCore;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Risco;
using PGRFacilAPI.Application.Risco.RiscoGetAll;
using PGRFacilAPI.Application.Shared;
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

            // Fetch existing perigos and danos and attach them to the relationship
            var perigoIds = risco.Perigos.Select(p => p.Id).ToList();
            var perigos = await dbContext.Perigos.Where(p => perigoIds.Contains(p.Id)).ToListAsync();

            var danoIds = risco.Danos.Select(d => d.Id).ToList();
            var danos = await dbContext.Danos.Where(d => danoIds.Contains(d.Id)).ToListAsync();

            riscoTable.Perigos = perigos;
            riscoTable.Danos = danos;
            dbContext.Update(riscoTable);
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

        public async Task<GetAllRepositoryResult<RiscoEntity>> GetAll(Guid gheId, RiscoGetAllQueryParameters queryParameters, RiscoGetAllFilterParameters filterParameters)
        {
            var query = dbContext.Riscos.AsQueryable();

            query = query.Where(r => r.GheId == gheId);

            query = ApplyTableFilters(query, filterParameters);

            var riscoTables = await query.Skip(queryParameters.Start)
                .Take(queryParameters.Limit)
                .Include(r => r.Perigos)
                .Include(r => r.Danos)
                .Include(r => r.PlanoDeAcao)
                .ToListAsync();

            IEnumerable<RiscoEntity> entities = riscoTables.Select(RiscoMapper.MapToEntity);
            entities = ApplyEntityFilters(entities, filterParameters);
            entities = queryParameters.SortBy is null ? entities :
                queryParameters.SortDirection == SortDirection.Ascendent ?
                    entities.OrderBy(queryParameters.SortBy.GetValue) :
                    entities.OrderByDescending(queryParameters.SortBy.GetValue);

            bool hasMoreData = entities.Count() > queryParameters.Start + queryParameters.Limit;

            return new GetAllRepositoryResult<RiscoEntity>(entities, hasMoreData);
        }

        private static IQueryable<RiscoTable> ApplyTableFilters(IQueryable<RiscoTable> query, RiscoGetAllFilterParameters filterParameters)
        {
            if (!string.IsNullOrEmpty(filterParameters.Local))
                query = query.Where(r => r.Local.ToUpper().Contains(filterParameters.Local.ToUpper()));

            if (!string.IsNullOrEmpty(filterParameters.Atividades))
                query = query.Where(r => r.Atividades.ToUpper().Contains(filterParameters.Atividades.ToUpper()));

            if (filterParameters.Agentes is not null)
                query = query.Where(r => r.Agentes == filterParameters.Agentes);

            if (!string.IsNullOrEmpty(filterParameters.TipoDeAvaliacao))
                query = query.Where(r => r.TipoDeAvaliacao.ToUpper().Contains(filterParameters.TipoDeAvaliacao.ToUpper()));

            if (filterParameters.Severidade.HasValue)
                query = query.Where(r => r.Severidade == filterParameters.Severidade.Value);

            if (filterParameters.MinSeveridade.HasValue)
                query = query.Where(r => r.Severidade >= filterParameters.MinSeveridade.Value);

            if (filterParameters.MaxSeveridade.HasValue)
                query = query.Where(r => r.Severidade <= filterParameters.MaxSeveridade.Value);

            if (filterParameters.Probabilidade.HasValue)
                query = query.Where(r => r.Probabilidade == filterParameters.Probabilidade.Value);

            if (filterParameters.MinProbabilidade.HasValue)
                query = query.Where(r => r.Probabilidade >= filterParameters.MinProbabilidade.Value);

            if (filterParameters.MaxProbabilidade.HasValue)
                query = query.Where(r => r.Probabilidade <= filterParameters.MaxProbabilidade.Value);

            return query;
        }

        private static IEnumerable<RiscoEntity> ApplyEntityFilters(IEnumerable<RiscoEntity> entities, RiscoGetAllFilterParameters filterParameters)
        {
            if (filterParameters.Significancia.HasValue)
                entities = entities.Where(r => r.Significancia == filterParameters.Significancia);

            if (filterParameters.MinSignificancia.HasValue)
                entities = entities.Where(r => r.Significancia >= filterParameters.MinSignificancia.Value);

            if (filterParameters.MaxSignificancia.HasValue)
                entities = entities.Where(r => r.Significancia <= filterParameters.MaxSignificancia.Value);

            if (filterParameters.NivelSignificancia is not null)
                entities = entities.Where(r => r.NivelSignificancia == filterParameters.NivelSignificancia);

            return entities;
        }

        public async Task<IEnumerable<RiscoEntity>> GetAll()
        {
            var riscoTables = await dbContext.Riscos.Include(r => r.Perigos).Include(r => r.Danos)
                .Include(r => r.PlanoDeAcao).ToListAsync();
            return riscoTables.Select(RiscoMapper.MapToEntity);
        }

        public async Task<RiscoEntity> GetById(Guid id)
        {
            RiscoTable riscoTable = await dbContext.Riscos.Include(r => r.Perigos).Include(r => r.Danos)
                .Include(r => r.PlanoDeAcao).Where(r => r.Id == id)
                .FirstOrDefaultAsync() ?? throw new EntityNotFoundException();

            return RiscoMapper.MapToEntity(riscoTable);
        }

        public async Task<RiscoEntity> GetById(Guid gheId, Guid riscoId)
        {
            RiscoTable riscoTable = await dbContext.Riscos.Include(r => r.Perigos).Include(r => r.Danos).Include(r => r.PlanoDeAcao)
                .Where(r => r.GheId == gheId && r.Id == riscoId)
                .FirstOrDefaultAsync() ?? throw new EntityNotFoundException();

            return RiscoMapper.MapToEntity(riscoTable);
        }

        public async Task Update(RiscoEntity risco)
        {
            RiscoTable riscoTable = await dbContext.Riscos.Include(r => r.Perigos).Include(r => r.Danos).Where(r => r.Id == risco.Id)
                .FirstOrDefaultAsync() ?? throw new EntityNotFoundException();

            riscoTable.Local = risco.Local;
            riscoTable.Atividades = risco.Atividades;
            riscoTable.Agentes = risco.Agentes;
            riscoTable.TipoDeAvaliacao = risco.TipoDeAvaliacao;
            riscoTable.Severidade = risco.Severidade;
            riscoTable.Probabilidade = risco.Probabilidade;

            // Update the perigos relationship
            var perigoIds = risco.Perigos.Select(p => p.Id).ToList();
            var perigos = await dbContext.Perigos.Where(p => perigoIds.Contains(p.Id)).ToListAsync();
            riscoTable.Perigos = perigos;

            // Update the danos relationship
            var danoIds = risco.Danos.Select(d => d.Id).ToList();
            var danos = await dbContext.Danos.Where(d => danoIds.Contains(d.Id)).ToListAsync();
            riscoTable.Danos = danos;

            dbContext.Riscos.Update(riscoTable);
            await dbContext.SaveChangesAsync();
        }
    }
}
