using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace PGRFacilAPI.Domain.Models
{
    public class User : IdentityUser
    {
        public ICollection<Programa> Programas { get; set; } = [];

        [NotMapped]
        public ICollection<string> Roles { get; set; } = [];
    }
}
