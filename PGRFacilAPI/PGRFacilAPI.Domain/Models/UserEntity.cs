namespace PGRFacilAPI.Domain.Models
{
    public class UserEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Email { get; set; }
        public ICollection<string> Roles { get; set; } = [];
    }
}
