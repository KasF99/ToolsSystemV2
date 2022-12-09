using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interface
{
    public interface IToolPropertiesRepository
    {
        Task<ToolToolProperties> GetToolToolProperties(int toolId, int toolPropertiesId);
        Task<Tools> GetToolsWithProperties(int toolId);
        Task<IEnumerable<ToolPropertiesDto>> GetToolProperties(string predicate, int toolId);
    }
}