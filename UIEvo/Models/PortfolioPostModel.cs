using System;
using System.ComponentModel.DataAnnotations;

namespace UIEvo.Models
{
    public class PortfolioPostModel
    {
        [Required]
        [StringLength(60)]
        public string Id { get; set; }

        [Required]
        [StringLength(60, MinimumLength = 1)]
        public string Header { get; set; }

        [StringLength(60, MinimumLength = 1)]
        public string CustomerTitle { get; set; }

        [StringLength(60, MinimumLength = 1)]
        public string Location { get; set; }

        public DateTimeOffset StartDate { get; set; }

        public DateTimeOffset FinishDate { get; set; }

        [StringLength(200, MinimumLength = 1)]
        public string ImageSource { get; set; }

        [StringLength(200, MinimumLength = 1)]
        public string VideoSource { get; set; }

        [StringLength(2000, MinimumLength = 1)]
        public string MainText { get; set; }

        [StringLength(200, MinimumLength = 1)]
        public string PlayStoreSource { get; set; }

        [StringLength(200, MinimumLength = 1)]
        public string PlayStoreText { get; set; }

        [StringLength(200, MinimumLength = 1)]
        public string AppStoreSource { get; set; }

        [StringLength(200, MinimumLength = 1)]
        public string AppStoreText { get; set; }

        [StringLength(60, MinimumLength = 1)]
        public string Footer { get; set; }
    }
}