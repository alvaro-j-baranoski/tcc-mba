using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Interfaces
{
    public interface IProgramaRepository
    {
        Task<Programa> Create(Programa programa);
    }
}
