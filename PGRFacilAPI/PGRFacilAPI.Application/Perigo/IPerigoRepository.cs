using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Perigo
{
    public interface IPerigoRepository
    {
        Task<PerigoEntity> Create(PerigoEntity perigo);
        Task<PerigoEntity> GetById(Guid id);
        Task<IEnumerable<PerigoEntity>> GetAll();
        Task Update(PerigoEntity perigo);
    }
}
