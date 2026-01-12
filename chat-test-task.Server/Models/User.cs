using System.ComponentModel.DataAnnotations;

namespace chat_test_task.Server.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Username { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? AvatarUrl { get; set; }

        public List<Chat> Chats { get; set; } = new();
        public List<Message> Messages { get; set; } = new();
    }
}