using API.DTOs;
using API.Entities;

namespace API.Interface
{
    public interface IToolsRepository
    {
        void Update(Tools tool);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<Tools>> GetToolssAsync();
        Task<Tools> GetToolsByIdAsync(int id);
        Task<Tools> GetToolsByToolnameAsync(string username);
        Task<IEnumerable<ToolsDto>> GetToolsAsync();
        Task<ToolsDto> GetToolAsync(string username);
        Task<IEnumerable<ToolsDto>> GetToolsByTheOwner(int id);
    }
}