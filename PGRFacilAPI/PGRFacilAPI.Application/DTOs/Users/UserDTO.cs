namespace PGRFacilAPI.Application.DTOs.Users
{
    public class UserDTO
    {
        public required string Id { get; set; }
        public required string Email { get; set; }
        public required IEnumerable<string> Roles { get; set; }
    }
}
