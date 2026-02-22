using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Risco
{
    public interface IRiscoRepository
    {
        /// <summary>
        /// Creates a new Risco entry in the database.
        /// </summary>
        Task<RiscoEntity> Create(RiscoEntity risco);

        /// <summary>
        /// Finds a Risco in the database from its id.
        /// </summary>
        /// <exception cref="EntityNotFoundException"/>
        Task<RiscoEntity> GetById(Guid id);

        /// <summary>
        /// Finds a Risco in the database from its id and parent GHE id.
        /// </summary>
        /// <exception cref="EntityNotFoundException"/>
        Task<RiscoEntity> GetById(Guid gheId, Guid riscoId);

        /// <summary>
        /// Finds all Riscos related to a GHE id.
        /// </summary>
        /// <exception cref="EntityNotFoundException"/>
        Task<IEnumerable<RiscoEntity>> GetAll(Guid gheId);

        /// <summary>
        /// Finds all Riscos saved in the database.
        /// </summary>
        Task<IEnumerable<RiscoEntity>> GetAll();

        /// <summary>
        /// Updates a Risco in the database.
        /// </summary>
        Task Update(RiscoEntity risco);

        /// <summary>
        /// Deletes a Risco from the database.
        /// </summary>
        Task Delete(Guid id);
    }
}
