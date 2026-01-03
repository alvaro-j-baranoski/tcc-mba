using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Interfaces
{
    public interface IProgramsRepository
    {
        Task<Programa> Create(Programa programa);
        Task<Programa?> GetByID(Guid guid);
        Task<IEnumerable<Programa>> GetAll();
        Task<Programa> Update(Guid guid, Programa programa, string usuarioID);
        Task UpdateDateTime(Guid guid, DateTime dateTime);
        Task Delete(Guid guid);
    }
}
