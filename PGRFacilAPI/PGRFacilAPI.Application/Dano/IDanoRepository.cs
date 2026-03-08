using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Dano
{
    public interface IDanoRepository
    {
        Task<DanoEntity> Create(DanoEntity dano);
        Task<DanoEntity> GetById(Guid id);
        Task<IEnumerable<DanoEntity>> GetAll(int start, int limit);
        Task Update(DanoEntity dano);
        Task Delete(Guid id);
    }
}
