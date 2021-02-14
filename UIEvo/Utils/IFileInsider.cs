using Microsoft.AspNetCore.Http;

namespace UIEvo.Utils
{
    public interface IFileInsider
    {
        public bool IsFormatAllowed(IFormFile Attachment);
    }
}
