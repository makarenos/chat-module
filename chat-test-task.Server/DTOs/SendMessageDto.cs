namespace chat_test_task.Server.DTOs
{
    public class SendMessageDto
    {
        public int ChatId { get; set; }
        public string Text { get; set; } = string.Empty;
    }
}