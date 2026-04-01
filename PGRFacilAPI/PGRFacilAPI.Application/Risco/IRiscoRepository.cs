using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Risco.RiscoGetAll;
using PGRFacilAPI.Application.Shared;
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
        /// Finds all Riscos based on filter parameters.
        /// </summary>
        /// <exception cref="EntityNotFoundException"/>
        Task<GetAllRepositoryResult<RiscoEntity>> GetAll(Guid? gheId, RiscoGetAllQueryParameters queryParameters, RiscoGetAllFilterParameters filterParameters);

        /// <summary>
        /// Finds all Riscos saved in the database.
        /// </summary>
        Task<IEnumerable<RiscoEntity>> GetAll();

        /// <summary>
        /// Finds all Riscos related to a specific GHE.
        /// </summary>
        /// <exception cref="EntityNotFoundException"/>
        Task<IEnumerable<RiscoEntity>> GetByGheId(Guid gheId);

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
