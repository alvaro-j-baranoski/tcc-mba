using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Perigo
{
    public interface IPerigoRepository
    {
        Task<PerigoEntity> Create(PerigoEntity perigo);
    }
}
