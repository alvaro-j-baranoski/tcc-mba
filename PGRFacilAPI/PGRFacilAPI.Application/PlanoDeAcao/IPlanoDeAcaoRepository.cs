using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.PlanoDeAcao
{
    public interface IPlanoDeAcaoRepository
    {
        Task<PlanoDeAcaoEntity> Create(PlanoDeAcaoEntity planoDeAcao, Guid riscoId);
    }
}
