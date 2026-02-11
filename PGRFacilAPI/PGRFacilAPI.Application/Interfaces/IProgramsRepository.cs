using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Interfaces
{
    public interface IProgramsRepository
    {
        Task<GheEntity> Create(GheEntity programa);
        Task<GheEntity?> GetByID(Guid guid);
        Task<IEnumerable<GheEntity>> GetAll();
        Task<GheEntity> Update(Guid guid, GheEntity programa);
        Task UpdateDateTime(Guid guid, DateTime dateTime);
        Task Delete(Guid guid);
    }
}
