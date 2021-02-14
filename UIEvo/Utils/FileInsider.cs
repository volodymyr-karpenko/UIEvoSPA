using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;

namespace UIEvo.Utils
{
    public class FileInsider : IFileInsider
    {
        public bool IsFormatAllowed(IFormFile Attachment)
        {
            Dictionary<string, List<byte[]>> _fileSignature = new Dictionary<string, List<byte[]>>
            {
                { ".doc", new List<byte[]>
                    {
                        new byte[] { 0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1 },
                        new byte[] { 0x0D, 0x44, 0x4F, 0x43 },
                        new byte[] { 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1, 0x00 },
                        new byte[] { 0xDB, 0xA5, 0x2D, 0x00 },
                        new byte[] { 0xEC, 0xA5, 0xC1, 0x00 }
                    }
                },

                { ".docx", new List<byte[]>
                    {
                        new byte[] { 0x50, 0x4B, 0x03, 0x04 },
                        new byte[] { 0x50, 0x4B, 0x03, 0x04, 0x14, 0x00, 0x06, 0x00 }
                    }
                },

                { ".pdf", new List<byte[]>
                    {
                        new byte[] { 0x25, 0x50, 0x44, 0x46 }
                    }
                },

                { ".png", new List<byte[]>
                    {
                        new byte[] { 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A }
                    }
                },

                { ".jpg", new List<byte[]>
                    {
                        new byte[] { 0xFF, 0xD8, 0xFF, 0xE0 },
                        new byte[] { 0xFF, 0xD8, 0xFF, 0xE1 },
                        new byte[] { 0xFF, 0xD8, 0xFF, 0xE8 }
                    }
                },

                { ".jpeg", new List<byte[]>
                    {
                        new byte[] { 0xFF, 0xD8, 0xFF, 0xE0 },
                        new byte[] { 0xFF, 0xD8, 0xFF, 0xE2 },
                        new byte[] { 0xFF, 0xD8, 0xFF, 0xE3 }
                    }
                }
            };

            string[] permittedExtensions = { ".doc", ".docx", ".pdf", ".png", ".jpg", ".jpeg" };

            string ext = Path.GetExtension(Attachment.FileName).ToLowerInvariant();

            if (string.IsNullOrEmpty(ext) || !permittedExtensions.Contains(ext))
            {
                return false;
            }

            using (var reader = new BinaryReader(Attachment.OpenReadStream()))
            {
                var signatures = _fileSignature[ext];
                var headerBytes = reader.ReadBytes(signatures.Max(m => m.Length));

                return signatures.Any(signature =>
                    headerBytes.Take(signature.Length).SequenceEqual(signature));
            }
        }
    }
}
