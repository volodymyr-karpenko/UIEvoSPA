namespace UIEvo.Models
{
    public class AdminSettings
    {
        public string AdminUsername { get; set; }
        public string AdminPassword { get; set; }
        public string EmailSenderName { get; set; }
        public string EmailSenderAddress { get; set; }
        public string EmailSenderPassword { get; set; }
        public string EmailReceiverName { get; set; }
        public string EmailReceiverAddress { get; set; }
        public string EmailSubject { get; set; }
    }
}
