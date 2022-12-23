using API.DTOs;
using API.Entities;

namespace API.Interface
{
    public interface IEmailService
    {
          void SendEmail(EmailDto request);
    }
}