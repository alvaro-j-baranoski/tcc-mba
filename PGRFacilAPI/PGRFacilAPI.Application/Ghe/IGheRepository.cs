using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Ghe
{
    public interface IGheRepository
    {
        /// <summary>
        /// Creates a new GHE in the database.
        /// </summary>
        Task<GheEntity> Create(GheEntity ghe);

        /// <summary>
        /// Get the GHE by ID.
        /// </summary>
        /// <exception cref="EntityNotFoundException"/>
        Task<GheEntity> GetById(Guid id);

        /// <summary>
        /// Gets all the persisted GHEs in the database.
        /// </summary>
        Task<IEnumerable<GheEntity>> GetAll();

        /// <summary>
        /// Updates a GHE entry.
        /// </summary>
        /// <exception cref="EntityNotFoundException"/>
        Task Update(Guid id, GheEntity entity);

        /// <summary>
        /// Updates the datetime property of a GHE based on the id.
        /// </summary>
        Task UpdateDateTime(Guid id, DateTime dateTime);

        /// <summary>
        /// Deletes a GHE from the table based on the id.
        /// </summary>
        /// <exception cref="EntityNotFoundException"/>
        Task Delete(Guid id);
    }
}
