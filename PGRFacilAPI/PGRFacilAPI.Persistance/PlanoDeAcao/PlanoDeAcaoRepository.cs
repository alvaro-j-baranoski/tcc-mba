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

                var planoDeAcaoTable = new PlanoDeAcaoTable
                {
                    Id = planoDeAcao.Id,
                    Responsavel = planoDeAcao.Responsavel,
                    DataInicio = planoDeAcao.DataInicio,
                    DataConclusao = planoDeAcao.DataConclusao,
                    Descricao = planoDeAcao.Descricao,
                    RiscoId = riscoId,
                    Risco = riscoTable
                };

                await dbContext.AddAsync(planoDeAcaoTable);
                await dbContext.SaveChangesAsync();
                return planoDeAcao;
            }
            catch (DbUpdateException ex)
            {
                throw new DatabaseOperationException();
            }
        }
    }
}
