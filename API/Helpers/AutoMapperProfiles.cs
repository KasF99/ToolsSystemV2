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
                src.Photos.FirstOrDefault(x => x.IsMain).Url))
             .ForMember(dest => dest.Owner, opt => opt.MapFrom(src =>
                src.AppUser.KnownAs));
            CreateMap<Photo, PhotoDto>();
        }
    }
}