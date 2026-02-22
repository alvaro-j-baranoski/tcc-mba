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
        
        Task<IEnumerable<RiscoEntity>> GetAll(Guid programaGuid);
        Task<RiscoEntity> Update(RiscoEntity risco);
        Task Delete(Guid guid);
        Task<IEnumerable<SimplifiedRisk>> GetSimplifiedRisks();
    }
}
