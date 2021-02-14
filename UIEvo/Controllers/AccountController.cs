using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using UIEvo.Models;

namespace UIEvo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IAntiforgery _antiforgery;
        private readonly ILogger<AccountController> _logger;

        public AccountController(SignInManager<ApplicationUser> signInManager, IAntiforgery antiforgery, ILogger<AccountController> logger)
        {
            _signInManager = signInManager;
            _antiforgery = antiforgery;
            _logger = logger;
        }

        // POST: api/account/getantiforgerydata
        [HttpPost("getantiforgerydata")]
        public AntiForgeryDataModel GetAntiForgeryData()
        {
            AntiForgeryDataModel data = new AntiForgeryDataModel
            {
                AntiForgeryHeader = "",
                AntiForgeryToken = ""
            };

            try
            {
                var tokens = _antiforgery.GetTokens(Request.HttpContext);
                data.AntiForgeryHeader = tokens.HeaderName;
                data.AntiForgeryToken = tokens.RequestToken;
                if (!string.IsNullOrEmpty(tokens.CookieToken))
                {
                    Response.Cookies.Append("CSRF-TOKEN", tokens.CookieToken);
                }
                Response.Headers.Add("Cache-control", "no-cache");
                Response.Headers.Add("X-Frame-Options", "SAMEORIGIN");
                Response.Headers.Add("Pragma", "no-cache");

                return data;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"{nameof(GetAntiForgeryData)} => FAIL");
            }

            return data;
        }

        // POST: api/account/authstatus
        [HttpPost("authstatus")]
        [ValidateAntiForgeryToken]
        public AuthStatusModel GetAuthStatus()
        {
            AuthStatusModel status = new AuthStatusModel { IsAuthenticated = false };

            try
            {
                status.IsAuthenticated = User.Identity.IsAuthenticated;

                return status;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"{nameof(GetAuthStatus)} => FAIL");
            }

            return status;
        }

        // POST: api/account/authenticate
        [HttpPost("authenticate")]
        [ValidateAntiForgeryToken]
        public async Task<string> AuthenticateAsync([FromBody] LoginModel model)
        {
            LoginModel credentials = new LoginModel
            {
                Email = model.Email,
                Password = model.Password,
                RememberMe = model.RememberMe
            };

            try
            {
                if (!string.IsNullOrEmpty(credentials.Email) && !string.IsNullOrEmpty(credentials.Password))
                {
                    var result = await _signInManager.PasswordSignInAsync(credentials.Email, credentials.Password, credentials.RememberMe, false);

                    if (result.Succeeded)
                    {
                        return "Logged in successfully!";
                    }
                }

                return "Incorrect username or password.";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"{nameof(AuthenticateAsync)} => FAIL with args: {model}");
            }

            return "Something went wrong. Try again!";
        }

        // POST: api/account/logout
        [HttpPost("logout")]
        public async Task<AuthStatusModel> LogoutAsync()
        {
            try
            {
                await _signInManager.SignOutAsync();
                return new AuthStatusModel { IsAuthenticated = false };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"{nameof(LogoutAsync)} => FAIL at {DateTime.UtcNow}");
            }

            return new AuthStatusModel { IsAuthenticated = true };
        }
    }
}