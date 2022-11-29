using System.Data.Common;
using System.Security.Claims;
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
        private readonly IUserRepository _userRepository;
        private readonly IPhotoService _photoService;

        private readonly IMapper _mapper;
        public ToolsController(IToolsRepository toolsRepository, IMapper mapper, IUserRepository userRepository, IPhotoService photoService)
        {
            this._photoService = photoService;
            this._userRepository = userRepository;
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


        [HttpPut("{toolname}")]
        public async Task<ActionResult> UpdateTool(ToolUpdateDto toolUpdateDto, string toolname)
        {
            var tool = await _toolsRepository.GetToolsByToolnameAsync(toolname);

            _mapper.Map(toolUpdateDto, tool);

            _toolsRepository.Update(tool);

            if (await _toolsRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to update tool");
        }

        [HttpPost("{toolname}/add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file, string toolname)
        {
            var tool = await _toolsRepository.GetToolsByToolnameAsync(toolname);

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (tool.Photos.Count == 0)
            {
                photo.IsMain = true;
            }

            tool.Photos.Add(photo);

            if (await _userRepository.SaveAllAsync()) return _mapper.Map<PhotoDto>(photo);

            return BadRequest("Problem addding photo");
        }
    }
}