using System.Data.Common;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class ToolsController : BaseApiController
    {
        private readonly IToolsRepository _toolsRepository;

        private readonly IMapper _mapper;
        public ToolsController(IToolsRepository toolsRepository, IMapper mapper)
        {
            this._toolsRepository = toolsRepository;
            this._mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToolsDto>>> GetTools()
        {
            var tools = await _toolsRepository.GetToolsAsync();

            return Ok(tools);
        }


        [HttpGet("{toolname}")]
        public async Task<ActionResult<ToolsDto>> GetTool(string toolname)
        {
            return await _toolsRepository.GetToolAsync(toolname);
        }

        // [HttpGet("{id}")]
        // public async Task<ActionResult<ToolsDto>> GetToolOwner(int id)
        // {
        //     var tools = await _toolsRepository.GetToolsByTheOwner(id);
        //     return Ok(tools);
        // }
    }
}