using API.DTOs;
using API.Entities;

namespace API.Interface
{
    public interface IToolsRepository
    {
        void Update(Tools tool);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<Tools>> GetToolssAsync();
        Task<AppUser> GetToolsByIdAsync(int id);
        Task<AppUser> GetToolsByToolnameAsync(string username);
        Task<IEnumerable<ToolsDto>> GetMembersAsync();
        Task<ToolsDto> GetMemberAsync(string username);
    }
}