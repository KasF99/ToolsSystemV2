namespace API.Entities
{
    public class ToolToolProperties
    {
        public int ToolId { get; set; }
        public Tools Tool { get; set; }
        public int ToolPropertiesId { get; set; }
        public ToolProperties ToolProperties { get; set; }  
        
    }
}