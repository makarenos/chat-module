using System.ComponentModel.DataAnnotations;

namespace chat_test_task.Server.Models
{
    public class Chat
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public ChatType Type { get; set; }

        public bool IsPinned { get; set; } = false;

        public bool IsFavorite { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public List<Message> Messages { get; set; } = new();
        public List<User> Users { get; set; } = new();
    }

    public enum ChatType
    {
        Group = 0,
        Friend = 1
    }
}