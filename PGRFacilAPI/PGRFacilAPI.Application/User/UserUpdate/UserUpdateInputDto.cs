namespace PGRFacilAPI.Application.User.UserUpdate
{
    public record UserUpdateInputDto(Guid Id, IEnumerable<string> Roles);
}
