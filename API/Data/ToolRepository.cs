using API.DTOs;
using API.Entities;
using API.Interface;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ToolRepository : IToolsRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ToolRepository(DataContext context, IMapper mapper)
        {
            this._mapper = mapper;
            this._context = context;
        }

        public async Task<ToolsDto> GetToolAsync(string toolname)
        {
            return await _context.Tools
             .Where(x => x.ToolName == toolname)
             .ProjectTo<ToolsDto>(_mapper.ConfigurationProvider)
             .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<ToolsDto>> GetToolsAsync()
        {
            return await _context.Tools
               .ProjectTo<ToolsDto>(_mapper.ConfigurationProvider)
               .ToListAsync();
        }

        public async Task<Tools> GetToolsByIdAsync(int id)
        {
            return await _context.Tools.FindAsync(id);
        }

        public async Task<IEnumerable<ToolsDto>> GetToolsByTheOwner(int id)   //for the future chagnes
        {

            return await _context.Tools  
                .Where(x => x.AppUserId == id)
                .ProjectTo<ToolsDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<Tools> GetToolsByToolnameAsync(string toolname)
        {
            return await _context.Tools
                .Include(t => t.Photos)
                .SingleOrDefaultAsync(x => x.ToolName == toolname);
        }

        public async Task<IEnumerable<Tools>> GetToolssAsync()
        {
            return await _context.Tools
                 .Include(t => t.Photos)
                 .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Tools tool)
        {
            _context.Entry(tool).State = EntityState.Modified;
        }
    }
}