using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.User.UserRegister
{
    public class UserRegisterUseCase(IUserRepository userRepository)
    {
        /// <summary>
        /// Registers a new user.
        /// </summary>
        /// <exception cref="DatabaseOperationException"/>
        public async Task Execute(UserRegisterInputDto input)
        {
            var user = new UserEntity { Email = input.Email };
            await userRepository.Create(user, input.Password);
        }
    }
}
