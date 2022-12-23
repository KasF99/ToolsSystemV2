using API.Entities;

namespace API.DTOs
{
    public class EmailDto
    {
        public EmailToolPropertiesDto Tool { get; set; }
        public string To { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;

    }


}