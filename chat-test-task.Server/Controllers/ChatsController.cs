using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using chat_test_task.Server.Data;
using chat_test_task.Server.DTOs;

namespace chat_test_task.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatsController : ControllerBase
    {
        private readonly ChatDbContext _context;

        public ChatsController(ChatDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ChatDto>>> GetChats()
        {
            var chats = await _context.Chats
                .Include(c => c.Users)
                .Include(c => c.Messages)
                .OrderByDescending(c => c.UpdatedAt)
                .ToListAsync();

            var chatDtos = chats.Select(c => new ChatDto
            {
                Id = c.Id,
                Name = c.Name,
                Type = c.Type.ToString(),
                IsPinned = c.IsPinned,
                IsFavorite = c.IsFavorite,
                UpdatedAt = c.UpdatedAt,
                LastMessage = c.Messages.OrderByDescending(m => m.Timestamp).FirstOrDefault()?.Text,
                Users = c.Users.Select(u => new UserDto
                {
                    Id = u.Id,
                    Username = u.Username,
                    AvatarUrl = u.AvatarUrl
                }).ToList()
            }).ToList();

            return Ok(chatDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ChatDto>> GetChat(int id)
        {
            var chat = await _context.Chats
                .Include(c => c.Users)
                .Include(c => c.Messages)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (chat == null)
            {
                return NotFound();
            }

            var chatDto = new ChatDto
            {
                Id = chat.Id,
                Name = chat.Name,
                Type = chat.Type.ToString(),
                IsPinned = chat.IsPinned,
                IsFavorite = chat.IsFavorite,
                UpdatedAt = chat.UpdatedAt,
                LastMessage = chat.Messages.OrderByDescending(m => m.Timestamp).FirstOrDefault()?.Text,
                Users = chat.Users.Select(u => new UserDto
                {
                    Id = u.Id,
                    Username = u.Username,
                    AvatarUrl = u.AvatarUrl
                }).ToList()
            };

            return Ok(chatDto);
        }
    }
}