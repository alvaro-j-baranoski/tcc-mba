namespace PGRFacilAPI.Application.User
{
    public record UserDto(Guid Id, string Email, IEnumerable<string> Roles);
}
