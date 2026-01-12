namespace chat_test_task.Server.DTOs
{
    public class ChatDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public bool IsPinned { get; set; }
        public bool IsFavorite { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string? LastMessage { get; set; }
        public List<UserDto> Users { get; set; } = new();
    }
}