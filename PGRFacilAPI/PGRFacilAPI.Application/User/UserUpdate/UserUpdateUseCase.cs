using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.User.UserUpdate
{
    public class UserUpdateUseCase(IUserRepository userRepository)
    {
        public async Task Execute(UserUpdateInputDto input)
        {
            UserEntity? user = await userRepository.FindByIdAsync(input.Id) ?? throw new UserNotFoundException();
            var currentUserRoles = await userRepository.GetRolesAsync(user);
            var rolesToAdd = input.Roles.Except(currentUserRoles);
            var rolesToRemove = currentUserRoles.Except(input.Roles);
            await userRepository.UpdateRoles(user, rolesToAdd, rolesToRemove);
        }
    }
}
