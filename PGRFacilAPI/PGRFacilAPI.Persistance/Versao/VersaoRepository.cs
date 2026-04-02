using Microsoft.EntityFrameworkCore;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Versao;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Persistance.Versao
{
    public class VersaoRepository(AppDbContext dbContext) : IVersaoRepository
    {
        public async Task<VersaoEntity> Create(VersaoEntity versao)
        {
            try
            {
                var gheTable = await dbContext.Ghes.FirstOrDefaultAsync(g => g.Id == versao.GheId)
                    ?? throw new EntityNotFoundException();

                var versaoTable = VersaoMapper.MapToTable(versao, gheTable);

                await dbContext.AddAsync(versaoTable);
                await dbContext.SaveChangesAsync();

                versao.Id = versaoTable.Id;
                return versao;
            }
            catch (DbUpdateException)
            {
                throw new DatabaseOperationException();
            }
        }

        public async Task<bool> ExistsByGheIdAndVersao(Guid gheId, string versao)
        {
            return await dbContext.Versoes
                .AnyAsync(v => v.GheId == gheId && v.Versao == versao);
        }

        public async Task Delete(int id)
        {
            var versaoTable = await dbContext.Versoes.FirstOrDefaultAsync(v => v.Id == id)
                ?? throw new EntityNotFoundException();

            dbContext.Versoes.Remove(versaoTable);
            await dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<VersaoEntity>> GetAllByGheId(Guid gheId)
        {
            return await dbContext.Versoes
                .Where(v => v.GheId == gheId)
                .Select(v => VersaoMapper.MapToEntity(v))
                .ToListAsync();
        }
    }
}
