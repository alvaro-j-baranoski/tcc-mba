using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Dano
{
    public interface IDanoRepository
    {
        Task<DanoEntity> Create(DanoEntity dano);
        Task<DanoEntity> GetById(Guid id);
    }
}
