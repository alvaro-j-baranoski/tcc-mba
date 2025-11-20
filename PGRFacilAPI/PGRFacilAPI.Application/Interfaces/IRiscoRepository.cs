using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Interfaces
{
    public interface IRiscoRepository
    {
        Task<Risco> Create(Risco risco);

        Task<Risco> GetByGuid(Guid guid);
    }
}
