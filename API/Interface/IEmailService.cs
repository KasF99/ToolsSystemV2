using API.DTOs;

namespace API.Interface
{
    public interface IEmailService
    {
          void SendEmail(EmailDto request);
    }
}