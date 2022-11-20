namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public string KnownAs { get; set; }
        public string Email { get; set; }
        public ICollection<Tools> Tools { get; set; }
    }
}