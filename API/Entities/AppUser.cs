using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public DateTime Created { get; set; } = DateTime.Now;
        public string KnownAs { get; set; }
        public override string Email { get; set; }
        public ICollection<Tools> Tools { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}