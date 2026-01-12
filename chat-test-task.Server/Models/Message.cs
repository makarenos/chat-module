using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace chat_test_task.Server.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ChatId { get; set; }

        public int? UserId { get; set; }

        [Required]
        [MaxLength(2000)]
        public string Text { get; set; } = string.Empty;

        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        public bool IsSystemMessage { get; set; } = false;

        [ForeignKey("ChatId")]
        public Chat? Chat { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }
    }
}