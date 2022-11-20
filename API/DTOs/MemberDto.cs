using API.Entities;

namespace API.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public DateTime Created { get; set; }
        public string KnownAs { get; set; }
        public string Email { get; set; }
        public ICollection<ToolsDto> Tools { get; set; }
    }
}