using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace UIEvo.Models
{
    public class AddEditPortfolioPostModel : PortfolioPostModel
    {
        [StringLength(60)]
        public string StartDateInput { get; set; }

        [StringLength(60)]
        public string FinishDateInput { get; set; }

        public IFormFile Attachment { get; set; }
    }
}
