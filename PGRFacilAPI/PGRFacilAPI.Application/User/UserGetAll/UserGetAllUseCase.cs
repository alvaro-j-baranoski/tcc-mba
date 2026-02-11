using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.User.UserGetAll
{
    public class UserGetAllUseCase(IUserRepository userRepository)
    {
        public async Task<UserGetAllOutputDto> Execute()
        {
            IEnumerable<UserEntity> users = await userRepository.GetAll();
            IEnumerable<UserDto> result = users.Select(u => new UserDto(u.Id, u.Email, u.Roles));
            return new UserGetAllOutputDto(result);
        }
    }
}
