using Microsoft.EntityFrameworkCore;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.PlanoDeAcao;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Persistance.PlanoDeAcao
{
    public class PlanoDeAcaoRepository(AppDbContext dbContext) : IPlanoDeAcaoRepository
    {
        public async Task<PlanoDeAcaoEntity> Create(PlanoDeAcaoEntity planoDeAcao, Guid riscoId)
        {
            try
            {
                var riscoTable = await dbContext.Riscos.FirstOrDefaultAsync(r => r.Id == riscoId)
                    ?? throw new EntityNotFoundException();

                var planoDeAcaoTable = PlanoDeAcaoMapper.MapToTable(planoDeAcao, riscoId, riscoTable);

                await dbContext.AddAsync(planoDeAcaoTable);
                await dbContext.SaveChangesAsync();
                return planoDeAcao;
            }
            catch (DbUpdateException)
            {
                throw new DatabaseOperationException();
            }
        }

        public async Task<PlanoDeAcaoEntity> Get(Guid riscoId)
        {
            var planoDeAcaoTable = await dbContext.PlanosDeAcao.FirstOrDefaultAsync(p => p.RiscoId == riscoId)
                ?? throw new EntityNotFoundException();

            var entity = PlanoDeAcaoMapper.MapToEntity(planoDeAcaoTable);

            return entity;
        }

        public async Task Delete(Guid riscoId)
        {
            try
            {
                var planoDeAcaoTable = await dbContext.PlanosDeAcao.FirstOrDefaultAsync(p => p.RiscoId == riscoId)
                    ?? throw new EntityNotFoundException();

                dbContext.PlanosDeAcao.Remove(planoDeAcaoTable);
                await dbContext.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                throw new DatabaseOperationException();
            }
        }
    }
}

