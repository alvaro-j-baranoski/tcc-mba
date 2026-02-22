using PGRFacilAPI.Application.Models;
using PGRFacilAPI.Domain.Models;
using PGRFacilAPI.Application.Exceptions;

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
        /// Updates a Risco in the database.
        /// </summary>
        Task Update(RiscoEntity risco);
        
        /// <summary>
        /// Deletes a Risco from the database.
        /// </summary>
        Task Delete(Guid id);
        Task<IEnumerable<SimplifiedRisk>> GetSimplifiedRisks();
    }
}
