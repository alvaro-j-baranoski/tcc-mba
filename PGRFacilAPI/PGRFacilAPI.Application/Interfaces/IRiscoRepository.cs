using PGRFacilAPI.Application.Models;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Interfaces
{
    public interface IRiscoRepository
    {
        Task<Risco> Create(Risco risco);
        Task<Risco> GetByID(Guid guid);
        Task<Risco> GetByID(Guid programaGuid, Guid riscoGuid);
        Task<IEnumerable<Risco>> GetAll(Guid programaGuid);
        Task<Risco> Update(Risco risco);
        Task Delete(Guid guid);
        Task<IEnumerable<SimplifiedRisco>> GetSimplifiedRiscos();
    }
}
