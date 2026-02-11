namespace PGRFacilAPI.Presentation.User
{
    public record UserLoginOutputRequest(string Email, string Token, IEnumerable<string> Roles);
}
