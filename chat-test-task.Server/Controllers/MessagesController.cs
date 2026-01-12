using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using chat_test_task.Server.Data;
using chat_test_task.Server.DTOs;
using chat_test_task.Server.Models;

namespace chat_test_task.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessagesController : ControllerBase
    {
        private readonly ChatDbContext _context;

        public MessagesController(ChatDbContext context)
        {
            _context = context;
        }

        [HttpGet("{chatId}")]
        public async Task<ActionResult<List<MessageDto>>> GetMessages(int chatId)
        {
            var messages = await _context.Messages
                .Where(m => m.ChatId == chatId)
                .Include(m => m.User)
                .OrderBy(m => m.Timestamp)
                .ToListAsync();

            var messageDtos = messages.Select(m => new MessageDto
            {
                Id = m.Id,
                ChatId = m.ChatId,
                UserId = m.UserId,
                Text = m.Text,
                Timestamp = m.Timestamp,
                IsSystemMessage = m.IsSystemMessage,
                User = m.User == null ? null : new UserDto
                {
                    Id = m.User.Id,
                    Username = m.User.Username,
                    AvatarUrl = m.User.AvatarUrl
                }
            }).ToList();

            return Ok(messageDtos);
        }

        [HttpPost]
        public async Task<ActionResult<MessageDto>> SendMessage(SendMessageDto dto)
        {
            var chat = await _context.Chats.FindAsync(dto.ChatId);
            if (chat == null)
            {
                return NotFound("Chat not found");
            }

            var currentUser = await _context.Users.FirstAsync(u => u.Username == "CurrentUser");

            var message = new Message
            {
                ChatId = dto.ChatId,
                UserId = currentUser.Id,
                Text = dto.Text,
                Timestamp = DateTime.UtcNow,
                IsSystemMessage = false
            };

            _context.Messages.Add(message);

            chat.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            var messageWithUser = await _context.Messages
                .Include(m => m.User)
                .FirstAsync(m => m.Id == message.Id);

            var messageDto = new MessageDto
            {
                Id = messageWithUser.Id,
                ChatId = messageWithUser.ChatId,
                UserId = messageWithUser.UserId,
                Text = messageWithUser.Text,
                Timestamp = messageWithUser.Timestamp,
                IsSystemMessage = messageWithUser.IsSystemMessage,
                User = new UserDto
                {
                    Id = messageWithUser.User!.Id,
                    Username = messageWithUser.User.Username,
                    AvatarUrl = messageWithUser.User.AvatarUrl
                }
            };

            return Ok(messageDto);
        }
    }
}