using PGRFacilAPI.Application.User;

namespace PGRFacilAPI.Presentation.User
{
    public record UserGetAllOutputRequest(IEnumerable<UserDto> Users);
}
