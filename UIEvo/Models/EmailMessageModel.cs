using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace UIEvo.Models
{
    public class EmailMessageModel
    {
        [Required]
        [StringLength(40, MinimumLength = 1)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(40, MinimumLength = 1)]
        public string Email { get; set; }

        [Required]
        [StringLength(2000, MinimumLength = 1)]
        public string Message { get; set; }

        public IFormFile Attachment { get; set; }        
    }
}