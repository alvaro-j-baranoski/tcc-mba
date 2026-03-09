using PGRFacilAPI.Application.Shared;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Dano
{
    public interface IDanoRepository
    {
        Task<DanoEntity> Create(DanoEntity dano);
        Task<DanoEntity> GetById(Guid id);
        Task<GetAllRepositoryResult<DanoEntity>> GetAll(GetAllQueryParameters queryParameters, string? descricao);
        Task Update(DanoEntity dano);
        Task Delete(Guid id);
    }
}
