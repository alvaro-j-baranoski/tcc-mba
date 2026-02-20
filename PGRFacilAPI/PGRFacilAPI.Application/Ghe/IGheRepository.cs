using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Ghe
{
    public interface IGheRepository
    {
        Task<GheEntity> Create(GheEntity ghe);
        /// <summary>
        /// Get the GHE by ID.
        /// </summary>
        /// <exception cref="EntityNotFoundException"/>
        Task<GheEntity> GetById(Guid id);
        Task<IEnumerable<GheEntity>> GetAll();
        Task<GheEntity> Update(Guid id, GheEntity programa);
        Task UpdateDateTime(Guid id, DateTime dateTime);
        Task Delete(Guid id);
    }
}
