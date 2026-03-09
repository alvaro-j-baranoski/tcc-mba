using Microsoft.EntityFrameworkCore;
using PGRFacilAPI.Application.Dano;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Shared;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Persistance.Dano
{
    public class DanoRepository(AppDbContext dbContext) : IDanoRepository
    {
        public async Task<DanoEntity> Create(DanoEntity dano)
        {
            try
            {
                DanoTable danoTable = DanoMapper.MapToTable(dano);
                await dbContext.AddAsync(danoTable);
                await dbContext.SaveChangesAsync();
                return dano;
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

        public async Task<DanoEntity> GetById(Guid id)
        {
            DanoTable danoTable = await dbContext.Danos.Where(d => d.Id == id)
                .FirstOrDefaultAsync() ?? throw new EntityNotFoundException();

            return DanoMapper.MapToEntity(danoTable);
        }

        public async Task<GetAllRepositoryResult<DanoEntity>> GetAll(GetAllQueryParameters queryParameters, string? descricao)
        {
            var query = dbContext.Danos.AsQueryable();

            if (!string.IsNullOrWhiteSpace(descricao))
            {
                // EF Core doesn't support Contains method with StringComparison parameter
                // https://learn.microsoft.com/en-us/dotnet/framework/data/adonet/ef/language-reference/supported-and-unsupported-linq-methods-linq-to-entities
                query = query.Where(d => d.Descricao.ToUpper().Contains(descricao.ToUpperInvariant()));
            }

            GetAllQueryResult<DanoTable> result = await GetAllQueryHelper.Query(query, queryParameters.Start, queryParameters.Limit);
            IEnumerable<DanoEntity> entities = result.Items.Select(DanoMapper.MapToEntity);
            IEnumerable<DanoEntity> ordered = queryParameters.SortDirection == SortDirection.Ascendent ?
                entities.OrderBy(e => e.Descricao) :
                entities.OrderByDescending(e => e.Descricao);
            return new GetAllRepositoryResult<DanoEntity>(ordered, result.HasMoreData);
        }

        public async Task Update(DanoEntity dano)
        {
            try
            {
                DanoTable danoTable = await dbContext.Danos.Where(d => d.Id == dano.Id)
                    .FirstOrDefaultAsync() ?? throw new EntityNotFoundException();

                danoTable.Descricao = dano.Descricao;

                dbContext.Danos.Update(danoTable);
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
            DanoTable danoTable = await dbContext.Danos.Where(d => d.Id == id)
                .FirstOrDefaultAsync() ?? throw new EntityNotFoundException();

            dbContext.Danos.Remove(danoTable);
            await dbContext.SaveChangesAsync();
        }
    }
}
