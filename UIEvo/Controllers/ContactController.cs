using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using UIEvo.Models;
using UIEvo.Utils;

namespace UIEvo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly AdminSettings _appSettings;
        private readonly ILogger<ContactController> _logger;
        private readonly IFileInsider _fileInsider;

        public ContactController(IOptions<AdminSettings> options, ILogger<ContactController> logger, IFileInsider fileInsider)
        {
            _appSettings = options.Value;
            _logger = logger;
            _fileInsider = fileInsider;
        }

        // POST: api/contact/submit
        [HttpPost("submit")]
        [ValidateAntiForgeryToken]
        public async Task<string> SendEmail([FromForm] EmailMessageModel model)
        {
            EmailMessageModel emailMessage = new EmailMessageModel
            {
                Name = model.Name,
                Email = model.Email,
                Message = model.Message,
                Attachment = model.Attachment
            };

            if (emailMessage.Attachment != null)
            {
                if (_fileInsider.IsFormatAllowed(emailMessage.Attachment))
                {
                    if (emailMessage.Attachment.Length > 10485760)
                    {
                        return "File size not supported.";
                    }
                }
                else
                {
                    return "File format not supported.";
                }
            }

            MailMessage message = new MailMessage();

            message.Body = $"<h2>Name: {emailMessage.Name}, Email: {emailMessage.Email}</h2><p>{emailMessage.Message}</p>";

            if (emailMessage.Attachment != null)
            {
                Attachment data = new Attachment(emailMessage.Attachment.OpenReadStream(), emailMessage.Attachment.FileName, emailMessage.Attachment.ContentType);
                message.Attachments.Add(data);
            }

            message.IsBodyHtml = true;
            message.From = new MailAddress(_appSettings.EmailSenderAddress, _appSettings.EmailSenderName);
            message.To.Add(new MailAddress(_appSettings.EmailReceiverAddress));
            message.Subject = _appSettings.EmailSubject;

            using (var client = new SmtpClient(_appSettings.SMTPHost, int.Parse(_appSettings.SMTPPort)))
            {
                client.Credentials = new NetworkCredential(_appSettings.SMTPUsername, _appSettings.SMTPPassword);
                client.EnableSsl = true;

                try
                {
                    await client.SendMailAsync(message);
                    return "Message successfully sent!";
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"{nameof(SendEmail)} => FAIL with args: {model.Name} {model.Email} {model.Message} {model.Attachment.FileName} {model.Attachment.ContentType}");
                }

                return "Something went wrong. Try again!";
            }            
        }        
    }
}
