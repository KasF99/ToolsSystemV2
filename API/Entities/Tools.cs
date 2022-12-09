using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Tools")]
    public class Tools
    {
        public int Id { get; set; }
        public string ToolNumber { get; set; }
        public string ToolName { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime DateOfService { get; set; }
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<ToolToolProperties> ToolToolProperties { get; set; }

        public int GetServiceDate()
        {
            var serviceDate = this.DateOfService;
            var today = DateTime.Today;

            return (serviceDate - today).Days;
        }
    }
}