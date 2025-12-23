using Microsoft.AspNetCore.Identity;

namespace PGRFacilAPI.Domain.Models
{
    public class Usuario : IdentityUser
    {
        public ICollection<Programa> Programas { get; set; } = [];
    }
}
