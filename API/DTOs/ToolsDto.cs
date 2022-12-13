using API.Entities;

namespace API.DTOs
{
    public class ToolsDto
    {
        public int Id { get; set; }
        public string ToolNumber { get; set; }
        public string ToolName { get; set; }
        public string Owner {get; set; }
        public string PhotoUrl { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime DateOfService { get; set; }
        public int ServiceDate { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
        public ToolPropertiesDto ToolProperties { get; set; } = new ToolPropertiesDto();
    }
}