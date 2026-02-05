namespace PGRFacilAPI.Application.DTOs.Users
{
    public record RegisterResponseDTO(bool IsSuccessful, string[] Errors);
}
