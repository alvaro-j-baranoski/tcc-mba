using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.PlanoDeAcao
{
    public interface IPlanoDeAcaoRepository
    {
        Task<PlanoDeAcaoEntity> Create(PlanoDeAcaoEntity planoDeAcao, Guid riscoId);
        Task<PlanoDeAcaoEntity> Get(Guid riscoId);
        Task Delete(Guid riscoId);
        Task Update(PlanoDeAcaoEntity planoDeAcao, Guid riscoId);
    }
}
