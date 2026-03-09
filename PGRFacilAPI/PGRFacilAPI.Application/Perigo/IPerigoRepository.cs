using PGRFacilAPI.Application.Shared;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Perigo
{
    public interface IPerigoRepository
    {
        Task<PerigoEntity> Create(PerigoEntity perigo);
        Task<PerigoEntity> GetById(Guid id);
        Task<GetAllRepositoryResult<PerigoEntity>> GetAll(GetAllQueryParameters queryParameters, string? descricao);
        Task Update(PerigoEntity perigo);
        Task Delete(Guid id);
    }
}
