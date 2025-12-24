using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Interfaces
{
    public interface IProgramaRepository
    {
        Task<Programa> Create(Programa programa);
        Task<Programa?> GetByID(Guid guid);
        Task<Programa> GetByID(Guid guid, string usuarioID);
        Task<IEnumerable<Programa>> GetAll(string usuarioID);
        Task<Programa> Update(Guid guid, Programa programa, string usuarioID);
        Task Delete(Guid guid, string usuarioID);
    }
}
