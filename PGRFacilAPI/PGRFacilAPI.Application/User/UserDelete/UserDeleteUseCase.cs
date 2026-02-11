namespace PGRFacilAPI.Application.User.UserDelete
{
    public class UserDeleteUseCase(IUserRepository userRepository)
    {
        public async Task Execute(UserDeleteInputDto input)
        {
            await userRepository.DeleteAsync(input.Id);
        }
    }
}
