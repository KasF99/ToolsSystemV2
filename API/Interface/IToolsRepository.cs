using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interface
{
    public interface IToolsRepository
    {
        void Update(Tools tool);
        Task<bool> SaveAllAsync();
        Task<Tools> GetToolsByIdAsync(int id);
        Task<Tools> GetToolsByToolnameAsync(string username);
        // Task<IEnumerable<ToolsDto>> GetToolsAsync(ToolParams userParams);
        Task<PagedList<ToolsDto>> GetToolsAsync(ToolParams userParams);

        Task<IEnumerable<ToolsDto>> GetToolsAsyncNP();
        Task<ToolsDto> GetToolAsync(string username);
    }
}