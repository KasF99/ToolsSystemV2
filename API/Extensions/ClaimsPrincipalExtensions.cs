using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetUsername(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }

        public static string GetToolname( this ClaimsPrincipal tool)
        {
            return tool.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}