namespace PGRFacilAPI.Application.User.UserLogin
{
    public record UserLoginOutputDto(string Email, string Token, IEnumerable<string> Roles);
}
