using Microsoft.EntityFrameworkCore;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Perigo;
using PGRFacilAPI.Application.Shared;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Persistance.Perigo
{
    public class PerigoRepository(AppDbContext dbContext) : IPerigoRepository
    {
        public async Task<PerigoEntity> Create(PerigoEntity perigo)
        {
            try
            {
                PerigoTable perigoTable = PerigoMapper.MapToTable(perigo);
                await dbContext.AddAsync(perigoTable);
                await dbContext.SaveChangesAsync();
                return perigo;
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is not null && ex.InnerException.Message.Contains("duplicate key"))
                {
                    throw new DatabaseOperationException();
                }
                throw;
            }
        }

        public async Task<PerigoEntity> GetById(Guid id)
        {
            PerigoTable perigoTable = await dbContext.Perigos.Where(p => p.Id == id)
                .FirstOrDefaultAsync() ?? throw new EntityNotFoundException();

            return PerigoMapper.MapToEntity(perigoTable);
        }

        public async Task<GetAllRepositoryResult<PerigoEntity>> GetAll(GetAllQueryParameters queryParameters, string? descricao)
        {
            var query = dbContext.Perigos.AsQueryable();

            if (!string.IsNullOrWhiteSpace(descricao))
            {
                query = query.Where(p => p.Descricao.ToUpper().Contains(descricao.ToUpperInvariant()));
            }

            GetAllQueryResult<PerigoTable> result = await GetAllQueryHelper.Query(query, queryParameters.Start, queryParameters.Limit);
            IEnumerable<PerigoEntity> entities = result.Items.Select(PerigoMapper.MapToEntity);
            IEnumerable<PerigoEntity> ordered = queryParameters.SortDirection == SortDirection.Ascendent ?
                entities.OrderBy(e => e.Descricao) :
                entities.OrderByDescending(e => e.Descricao);
            return new GetAllRepositoryResult<PerigoEntity>(ordered, result.HasMoreData);
        }

        public async Task Update(PerigoEntity perigo)
        {
            try
            {
                PerigoTable perigoTable = await dbContext.Perigos.Where(p => p.Id == perigo.Id)
                    .FirstOrDefaultAsync() ?? throw new EntityNotFoundException();

                perigoTable.Descricao = perigo.Descricao;

                dbContext.Perigos.Update(perigoTable);
                await dbContext.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is not null && ex.InnerException.Message.Contains("duplicate key"))
                {
                    throw new DatabaseOperationException();
                }
                throw;
            }
        }

        public async Task Delete(Guid id)
        {
            PerigoTable perigoTable = await dbContext.Perigos.Where(p => p.Id == id)
                .FirstOrDefaultAsync() ?? throw new EntityNotFoundException();

            dbContext.Perigos.Remove(perigoTable);
            await dbContext.SaveChangesAsync();
        }
    }
}
