using PGRFacilAPI.Application.Models;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Risco
{
    public interface IRiscoRepository
    {
        /// <summary>
        /// Creates a new Risco entry in the database.
        /// </summary>
        Task<RiscoEntity> Create(RiscoEntity risco);
        Task<RiscoEntity> GetByID(Guid guid);
        Task<RiscoEntity> GetByID(Guid gheId, Guid riscoGuid);
        Task<IEnumerable<RiscoEntity>> GetAll(Guid programaGuid);
        Task<RiscoEntity> Update(RiscoEntity risco);
        Task Delete(Guid guid);
        Task<IEnumerable<SimplifiedRisk>> GetSimplifiedRisks();
    }
}
