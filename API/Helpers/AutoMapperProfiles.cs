using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc.TagHelpers;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>();
            CreateMap<Tools, ToolsDto>()
             .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src =>
                src.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<Photo, PhotoDto>();
        }
    }
}