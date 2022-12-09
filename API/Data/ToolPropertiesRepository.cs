using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interface;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ToolPropertiesRepository : IToolPropertiesRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ToolPropertiesRepository(DataContext context, IMapper mapper)
        {
            this._mapper = mapper;
            this._context = context;
        }

        public async Task<Tools> GetToolsWithProperties(int toolId)
        {
            return await _context.Tools
                .Include(x => x.ToolToolProperties)
                .FirstOrDefaultAsync(x => x.Id == toolId);
        }

        public async Task<ToolToolProperties> GetToolToolProperties(int toolId, int toolPropertiesId)
        {
            return await _context.Properties.FindAsync(toolId, toolPropertiesId);
        }


        public async Task<IEnumerable<ToolPropertiesDto>> GetToolProperties(string predicate, int toolId)
        {
            var tool = _context.Tools.OrderBy(u => u.ToolName).AsQueryable();
            var toolproperties = _context.ToolProps.AsQueryable();
            var properties = _context.Properties.AsQueryable();

            return await _context.ToolProps.ProjectTo<ToolPropertiesDto>(_mapper.ConfigurationProvider)
               .ToListAsync();
        }



        // public async Task<PagedList<ToolProperties>> GetUserLikes(string predicate, int toolId)
        // {

        //     var tool = _context.Tools.OrderBy(u => u.ToolName).AsQueryable();
        //     var properties = _context.Properties.AsQueryable();

        //     // if (predicate == "liked")
        //     // {
        //     //     likes = likes.Where(like => like.SourceUserId == likesParams.UserId);
        //     //     users = likes.Select(like => like.LikedUser);
        //     // }

        //     // if (predicate == "liked")
        //     // {
        //     //     likes = likes.Where(like => like.LikedUserId == likesParams.UserId);
        //     //     users = likes.Select(like => like.SourceUser);
        //     // }

        //     return await tool.Select(tool => new ToolPropertiesDto
        //     {
        //         ExternalIsCleanState =
        //     }).ToListAsync();


        // }


    }
}