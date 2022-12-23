using AutoMapper;

namespace API.DTOs
{
    public class EmailToolPropertiesDto
    {
        public string ToolName { get; set; }
        public string Owner { get; set; }
        public DateTime DateOfService { get; set; }
        public bool? IsValid { get; set; }
        public string Email { get; set; }
    }
}