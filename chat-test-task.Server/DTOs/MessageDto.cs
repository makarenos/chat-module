namespace chat_test_task.Server.DTOs
{
    public class MessageDto
    {
        public int Id { get; set; }
        public int ChatId { get; set; }
        public int? UserId { get; set; }
        public string Text { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; }
        public bool IsSystemMessage { get; set; }
        public UserDto? User { get; set; }
    }
}