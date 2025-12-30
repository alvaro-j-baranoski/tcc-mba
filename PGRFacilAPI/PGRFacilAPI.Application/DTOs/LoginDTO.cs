namespace PGRFacilAPI.Application.DTOs
{
    public class LoginDTO
    {
        public required string Email { get; set; }
        public required string Token { get; set; }
    }
}
