using System.Reflection.Metadata;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers;

[Authorize]

public class UsersController : BaseApiController
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly DataContext _context;
    private readonly IToolsRepository _toolsRepository;
    public UsersController(IUserRepository userRepository, IMapper mapper, DataContext context, IToolsRepository toolsRepository)
    {
        this._toolsRepository = toolsRepository;
        this._context = context;
        this._mapper = mapper;
        this._userRepository = userRepository;
    }

    [HttpGet]
    public async Task<ActionResult<PagedList<MemberDto>>> GetUsers([FromQuery]UserParams userParams)
    {
        var currentUser = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
        userParams.CurrentUsername = currentUser.UserName;
        
        var users = await _userRepository.GetMembersAsync(userParams);
        
        Response.AddPaginationHeader(new PaginationHeader(users.CurrentPage, users.PageSize, 
                users.TotalCount, users.TotalPages));

        return Ok(users);
    }


    // [HttpGet]
    // public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
    // {
    //     var users = await _userRepository.GetMembersAsync();

    //     return Ok(users);
    // }

    [HttpGet("{username}")]
    public async Task<ActionResult<MemberDto>> GetUser(string username)
    {
        return await _userRepository.GetMemberAsync(username);
    }

    [HttpPost("{owner}/register-tool")]
    public async Task<ActionResult<ToolsDto>> RegisterTool(ToolsDto toolDto, string owner)
    {
        if (await ToolExists(toolDto.ToolName)) return BadRequest("There is a tool with that name");

        var user = await _userRepository.GetUserByUsernameAsync(owner);

        var tool = _mapper.Map<Tools>(toolDto);
  
        user.Tools.Add(tool);

        if (await _userRepository.SaveAllAsync())
        {
            {
                return _mapper.Map<ToolsDto>(tool);
            }
        }

        return BadRequest("Problem adding the tool");
    }

    [HttpDelete("{owner}/delete-tool/{toolname}")]
    public async Task<ActionResult> DeleteTool(string toolname, string owner)
    {
        var tool = await _toolsRepository.GetToolsByToolnameAsync(toolname);

        var user = await _userRepository.GetUserByUsernameAsync(owner);

        if (tool == null) return NotFound();

        user.Tools.Remove(tool);
        
        if (await _userRepository.SaveAllAsync()) return Ok();

        return BadRequest("Failed to delete the photo");

    }

    private async Task<bool> ToolExists(string toolname)
    {
        return await _context.Tools.AnyAsync(x => x.ToolName == toolname.ToLower());
    }




}
