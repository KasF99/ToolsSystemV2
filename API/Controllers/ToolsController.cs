using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class ToolsController: BaseApiController
    {
    private readonly DataContext _context;
    public ToolsController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Tools>>> GetTools()
    {
        return await _context.Tools.ToListAsync();
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<Tools>> GetTool(int id)
    {
        return await _context.Tools.FindAsync(id);
    }
    }
}