namespace PGRFacilAPI.Application.DTOs.Users
{
    public class LoginResponseDTO
    {
        public required string Email { get; set; }
        public required string Token { get; set; }
        public required IEnumerable<string> Roles { get; set; }
    }
}
