using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Interfaces
{
    public interface IUsersRepository
    {
        Task<IEnumerable<User>> GetAll();
    }
}
