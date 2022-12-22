using System.Data.Common;
using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
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
        private readonly IEmailService _emailService;

        private readonly IMapper _mapper;
        public ToolsController(IToolsRepository toolsRepository, IMapper mapper, IUserRepository userRepository, IPhotoService photoService, IEmailService emailService)
        {
            this._emailService = emailService;
            this._photoService = photoService;
            this._userRepository = userRepository;
            this._toolsRepository = toolsRepository;
            this._mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToolsDto>>> GetTools([FromQuery] ToolParams userParams, [FromQuery] bool returnAll = false)
        {
            if (returnAll == false)
            {
                var tools = await _toolsRepository.GetToolsAsync(userParams);
                Response.AddPaginationHeader(new PaginationHeader(tools.CurrentPage, tools.PageSize, tools.TotalCount, tools.TotalPages));
                return Ok(tools);
            }

            else
            {
                var tools = await _toolsRepository.GetToolsAsyncNP();
                return Ok(tools);
            }
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


        [HttpPut("{toolname}/service")]
        public async Task<ActionResult> ServiceTool(ToolPropertiesUpdateDto toolPropertiesDto, string toolname)
        {
            var tool = await _toolsRepository.GetToolsByToolnameAsync(toolname);

            var toolProps = tool.ToolProperties;

            _mapper.Map(toolPropertiesDto, toolProps);

            tool.DateOfService = toolPropertiesDto.DateOfService; //you can create mapper but is it worth for one prop?

            _toolsRepository.Update(tool);

            if (await _toolsRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to service tool");
        }

        [HttpPost("email")]
        public IActionResult SendEmail(EmailDto request)
        {
            _emailService.SendEmail(request);
            return Ok();
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

            if (await _userRepository.SaveAllAsync())
            {
                return CreatedAtAction(nameof(GetTool), new { toolname = tool.ToolName }, _mapper.Map<PhotoDto>(photo));
            }

            return BadRequest("Problem addding photo");
        }


        [HttpPut("{toolname}/set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId, string toolname)
        {
            var tool = await _toolsRepository.GetToolsByToolnameAsync(toolname);

            var photo = tool.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo.IsMain) return BadRequest("This is already your main photo");

            var currentMain = tool.Photos.FirstOrDefault(x => x.IsMain);

            if (currentMain != null) currentMain.IsMain = false;

            photo.IsMain = true;

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to set main photo");
        }

        [HttpDelete("{toolname}/delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId, string toolname)
        {
            var tool = await _toolsRepository.GetToolsByToolnameAsync(toolname);

            var photo = tool.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return NotFound();

            if (photo.IsMain) return BadRequest("You cannot delete tool's main photo");

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }

            tool.Photos.Remove(photo);

            if (await _userRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to delete the photo");
        }
    }
}