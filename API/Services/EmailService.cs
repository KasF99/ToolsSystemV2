using System.Diagnostics;
using API.Data.Migrations;
using API.DTOs;
using API.Entities;
using API.Interface;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;



namespace API.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;
        public EmailService(IConfiguration config)
        {
            this._config = config;
        }

        // public void SendEmail(EmailDto request)
        // {
        //     request.tool = tool;
        //     var email = new MimeMessage();
        //     email.From.Add(MailboxAddress.Parse(_config.GetSection("EmailUsername").Value));
        //     email.To.Add(MailboxAddress.Parse(request.To));
        //     email.Subject = request.Subject;
        //     // email.Body = new TextPart(TextFormat.Html) { Text = request.Body };
        //     email.Body = new TextPart(TextFormat.Html) { Text = request.Body };

        //     using var smtp = new SmtpClient();
        //     smtp.Connect(_config.GetSection("EmailHost").Value, 587, SecureSocketOptions.StartTls);
        //     smtp.Authenticate(_config.GetSection("EmailUsername").Value, _config.GetSection("EmailPassword").Value);
        //     smtp.Send(email);
        //     smtp.Disconnect(true);
        // }

        public void SendEmail(EmailDto request)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_config.GetSection("EmailUsername").Value));
            email.To.Add(MailboxAddress.Parse(request.To));
            email.Subject = request.Subject;
            email.Body = new TextPart(TextFormat.Html) { Text = CreateBody(request.Tool) };

            using var smtp = new SmtpClient();
            smtp.Connect(_config.GetSection("EmailHost").Value, 587, SecureSocketOptions.StartTls);
            smtp.Authenticate(_config.GetSection("EmailUsername").Value, _config.GetSection("EmailPassword").Value);
            smtp.Send(email);
            smtp.Disconnect(true);
        }


        public string CreateBody(EmailToolPropertiesDto Tool)
        {
            // var EM = new EmailToolPropertiesDto()
            // {
            //       ToolName = Tool.ToolName,
            //       Owner = Tool.Owner,
            //       DateOfService = Tool.DateOfService,
            //       IsValid = Tool.ToolProperties.IsValid, 
            // };
            var EM = Tool;
            string body = string.Empty;
            var temp = @"Services/Email.html";
            using (StreamReader reader = new StreamReader(temp))
            {
                body = reader.ReadToEnd();
            }

            body = body.Replace("{toolname}", EM.ToolName); //replacing Parameters
            body = body.Replace("{state}", EM.IsValid.ToString());
            body = body.Replace("{dos}", EM.DateOfService.ToString());
            body = body.Replace("{user}", EM.Owner);

            return body;
        }
        public string MapPath(string path)
        {
            return Path.Combine(
            (string)AppDomain.CurrentDomain.GetData("ContentRootPath"),
            path);
        }

        public string BtS(bool value)
        {
            if (value == true)
                return "TRUE";
            else
                return "FALSE";
        }
    }
}