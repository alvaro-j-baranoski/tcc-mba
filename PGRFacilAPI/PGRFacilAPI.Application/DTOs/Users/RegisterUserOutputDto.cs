namespace PGRFacilAPI.Application.DTOs.Users
{
    public record RegisterUserOutputDto(bool IsSuccessful, string[] Errors);
}
