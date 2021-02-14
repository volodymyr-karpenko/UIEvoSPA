using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using UIEvo.Data.AppDb;
using UIEvo.Models;
using UIEvo.Utils;

namespace UIEvo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PortfolioController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IHostEnvironment _env;
        private readonly ILogger<PortfolioController> _logger;
        private readonly string _publicDir;
        private readonly string _saveDir;
        private readonly IFileInsider _fileInsider;

        public PortfolioController(AppDbContext context, IHostEnvironment env, ILogger<PortfolioController> logger, IFileInsider fileInsider)
        {
            _context = context;
            _env = env;
            _logger = logger;
            _fileInsider = fileInsider;

            string dir = AppDomain.CurrentDomain.BaseDirectory;

            if (_env.IsDevelopment())
            {
                string appName = AppDomain.CurrentDomain.FriendlyName;
                string appDevelopmentDir = dir.Substring(0, dir.LastIndexOf(appName)) + appName;
                _publicDir = appDevelopmentDir.Replace(@"\", "/") + "/ClientApp/public";
                _saveDir = _publicDir + "/img/uploads/";
            }
            else
            {
                _publicDir = dir.Replace(@"\", "/") + "/ClientApp/build";
                _saveDir = _publicDir + "/img/uploads/";
            }
        }

        // POST: api/portfolio/create
        [HttpPost("create")]
        [ValidateAntiForgeryToken]
        [Authorize]
        public async Task<string> CreatePostAsync([FromForm] AddEditPortfolioPostModel form)
        {
            if (form.Attachment != null)
            {
                if (_fileInsider.IsFormatAllowed(form.Attachment))
                {
                    if (form.Attachment.Length > 2097152)
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
                DateTimeOffset newStartDate = new DateTimeOffset(DateTime.Parse(form.StartDateInput));
                DateTimeOffset newFinishDate = new DateTimeOffset(DateTime.Parse(form.FinishDateInput));

                PortfolioPostModel newPost = new PortfolioPostModel
                {
                    Id = form.Id,
                    Header = form.Header,
                    CustomerTitle = form.CustomerTitle,
                    Location = form.Location,
                    StartDate = newStartDate,
                    FinishDate = newFinishDate,
                    ImageSource = form.ImageSource,
                    VideoSource = form.VideoSource,
                    MainText = form.MainText,
                    PlayStoreSource = form.PlayStoreSource,
                    PlayStoreText = form.PlayStoreText,
                    AppStoreSource = form.AppStoreSource,
                    AppStoreText = form.AppStoreText,
                    Footer = form.Footer
                };

                if (form.Attachment != null)
                {
                    var generatedFileName = Path.GetFileNameWithoutExtension(Path.GetRandomFileName()) + Path.GetExtension(form.Attachment.FileName);
                    var filePath = Path.Combine(_saveDir, generatedFileName);

                    using (var stream = System.IO.File.Create(filePath))
                    {
                        await form.Attachment.CopyToAsync(stream);
                        newPost.ImageSource = "/img/uploads/" + generatedFileName;
                    }
                }

                _context.Add(newPost);
                await _context.SaveChangesAsync();

                return "Post successfully saved!";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"{nameof(CreatePostAsync)} => FAIL with args: {form}");
            }

            return "Something went wrong. Try again!";
        }

        // GET: api/portfolio/readall
        [HttpGet("readall")]
        public async Task<List<PortfolioPostModel>> ReadAllPostsAsync()
        {
            try
            {
                List<PortfolioPostModel> portfolio = await _context.PortfolioPosts.ToListAsync();
                portfolio.Sort((a, b) => DateTimeOffset.Compare(a.FinishDate, b.FinishDate));
                portfolio.Reverse();
                return portfolio;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"{nameof(ReadAllPostsAsync)} => FAIL");
            }

            return new List<PortfolioPostModel>();
        }

        // POST: api/portfolio/read
        [HttpPost("read")]
        public async Task<PortfolioPostModel> ReadPostAsync([FromBody] PortfolioRequestModel body)
        {
            try
            {
                if (!PortfolioPostModelExists(body.Id))
                {
                    return new PortfolioPostModel();
                }

                return await _context.PortfolioPosts.FindAsync(body.Id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"{nameof(ReadPostAsync)} => FAIL with args: {body}");
            }

            return new PortfolioPostModel();
        }

        // PUT: api/portfolio/edit
        [HttpPut("edit")]
        [ValidateAntiForgeryToken]
        [Authorize]
        public async Task<string> EditPostAsync([FromForm] AddEditPortfolioPostModel form)
        {
            if (form.Attachment != null)
            {
                if (_fileInsider.IsFormatAllowed(form.Attachment))
                {
                    if (form.Attachment.Length > 2097152)
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
                DateTimeOffset newStartDate = new DateTimeOffset(DateTime.Parse(form.StartDateInput));
                DateTimeOffset newFinishDate = new DateTimeOffset(DateTime.Parse(form.FinishDateInput));

                PortfolioPostModel post = new PortfolioPostModel
                {
                    Id = form.Id,
                    Header = form.Header,
                    CustomerTitle = form.CustomerTitle,
                    Location = form.Location,
                    StartDate = newStartDate,
                    FinishDate = newFinishDate,
                    ImageSource = form.ImageSource,
                    VideoSource = form.VideoSource,
                    MainText = form.MainText,
                    PlayStoreSource = form.PlayStoreSource,
                    PlayStoreText = form.PlayStoreText,
                    AppStoreSource = form.AppStoreSource,
                    AppStoreText = form.AppStoreText,
                    Footer = form.Footer
                };

                if (!PortfolioPostModelExists(form.Id))
                {
                    return "Invalid post ID.";
                }

                if (form.Attachment != null)
                {
                    var existingFilePath = _publicDir + form.ImageSource;
                    if (System.IO.File.Exists(existingFilePath))
                    {
                        System.IO.File.Delete(existingFilePath);
                    }

                    var generatedFileName = Path.GetFileNameWithoutExtension(Path.GetRandomFileName()) + Path.GetExtension(form.Attachment.FileName);
                    var filePath = Path.Combine(_saveDir, generatedFileName);

                    using (var stream = System.IO.File.Create(filePath))
                    {
                        await form.Attachment.CopyToAsync(stream);
                        post.ImageSource = "/img/uploads/" + generatedFileName;
                    }
                }

                _context.Update(post);
                await _context.SaveChangesAsync();

                return "Post successfully saved!";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"{nameof(EditPostAsync)} => FAIL with args: {form}");
            }

            return "Something went wrong. Try again!";
        }

        // DELETE: api/portfolio/delete
        [HttpDelete("delete")]
        [ValidateAntiForgeryToken]
        [Authorize]
        public async Task<string> DeletePostAsync([FromBody] PortfolioRequestModel body)
        {
            if (!PortfolioPostModelExists(body.Id))
            {
                return "Invalid post ID.";
            }

            try
            {
                PortfolioPostModel post = await _context.PortfolioPosts.FindAsync(body.Id);

                var existingFilePath = _publicDir + post.ImageSource;
                if (System.IO.File.Exists(existingFilePath))
                {
                    System.IO.File.Delete(existingFilePath);
                }

                _context.PortfolioPosts.Remove(post);
                await _context.SaveChangesAsync();

                return "Post successfully deleted!";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"{nameof(DeletePostAsync)} => FAIL with args: {body}");
            }

            return "Something went wrong. Try again!";
        }

        private bool PortfolioPostModelExists(string id)
        {
            return _context.PortfolioPosts.Any(e => e.Id == id);
        }        
    }
}
