using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
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

            try
            {
                await Task.Factory.StartNew(() =>
                {
                    var message = new MimeMessage();
                    message.From.Add(new MailboxAddress(_appSettings.EmailSenderName, _appSettings.EmailSenderAddress));
                    message.To.Add(new MailboxAddress(_appSettings.EmailReceiverName, _appSettings.EmailReceiverAddress));
                    message.Subject = _appSettings.EmailSubject;

                    var body = new TextPart("plain")
                    {
                        Text = "Name: " + emailMessage.Name + "\r\nEmail: " + emailMessage.Email + "\r\n\r\n\r\n" + emailMessage.Message
                    };

                    if (emailMessage.Attachment != null)
                    {
                        var attachment = new MimePart()
                        {
                            Content = new MimeContent(emailMessage.Attachment.OpenReadStream(), ContentEncoding.Default),
                            ContentDisposition = new ContentDisposition(ContentDisposition.Attachment),
                            ContentTransferEncoding = ContentEncoding.Base64,
                            FileName = emailMessage.Attachment.FileName
                        };

                        var multipart = new Multipart("mixed");
                        multipart.Add(body);
                        multipart.Add(attachment);

                        message.Body = multipart;
                    }
                    else
                    {
                        message.Body = body;
                    }

                    using (var client = new SmtpClient())
                    {
                        client.Connect("smtp.gmail.com", 587, false);
                        client.Authenticate(_appSettings.EmailSenderAddress, _appSettings.EmailSenderPassword);
                        client.Send(message);
                        client.Disconnect(true);
                    }
                });

                return "Message successfully sent!";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"{nameof(SendEmail)} => FAIL with args: {model}");
            }

            return "Something went wrong. Try again!";
        }        
    }
}
