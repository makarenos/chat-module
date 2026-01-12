using chat_test_task.Server.Models;

namespace chat_test_task.Server.Data
{
    public static class SeedData
    {
        public static void Initialize(ChatDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Users.Any())
            {
                return;
            }

            var users = new User[]
            {
                new User { Username = "CurrentUser", AvatarUrl = "https://i.pravatar.cc/150?img=1" },
                new User { Username = "Alice", AvatarUrl = "https://i.pravatar.cc/150?img=2" },
                new User { Username = "Bob", AvatarUrl = "https://i.pravatar.cc/150?img=3" },
                new User { Username = "Charlie", AvatarUrl = "https://i.pravatar.cc/150?img=4" }
            };
            context.Users.AddRange(users);
            context.SaveChanges();

            var chats = new Chat[]
            {
                new Chat
                {
                    Name = "Group Chat 01",
                    Type = ChatType.Group,
                    IsPinned = true,
                    IsFavorite = false,
                    CreatedAt = DateTime.UtcNow.AddDays(-7),
                    UpdatedAt = DateTime.UtcNow.AddMinutes(-10)
                },
                new Chat
                {
                    Name = "Group Chat 02",
                    Type = ChatType.Group,
                    IsPinned = false,
                    IsFavorite = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-3),
                    UpdatedAt = DateTime.UtcNow.AddMinutes(-5)
                },
                new Chat
                {
                    Name = "Alice",
                    Type = ChatType.Friend,
                    IsPinned = false,
                    IsFavorite = false,
                    CreatedAt = DateTime.UtcNow.AddDays(-1),
                    UpdatedAt = DateTime.UtcNow.AddMinutes(-2)
                }
            };
            context.Chats.AddRange(chats);
            context.SaveChanges();

            chats[0].Users.Add(users[0]);
            chats[0].Users.Add(users[1]);
            chats[0].Users.Add(users[2]);
            chats[0].Users.Add(users[3]);

            chats[1].Users.Add(users[0]);
            chats[1].Users.Add(users[1]);
            chats[1].Users.Add(users[2]);

            chats[2].Users.Add(users[0]);
            chats[2].Users.Add(users[1]);

            context.SaveChanges();

            var messages = new Message[]
            {
                new Message
                {
                    ChatId = chats[0].Id,
                    UserId = null,
                    Text = "Alice added you to this chat",
                    Timestamp = DateTime.UtcNow.AddDays(-7),
                    IsSystemMessage = true
                },
                new Message
                {
                    ChatId = chats[0].Id,
                    UserId = users[1].Id,
                    Text = "Welcome everyone!",
                    Timestamp = DateTime.UtcNow.AddDays(-7).AddMinutes(1),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[0].Id,
                    UserId = users[2].Id,
                    Text = "Thanks for adding me!",
                    Timestamp = DateTime.UtcNow.AddDays(-7).AddMinutes(2),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[1].Id,
                    UserId = users[1].Id,
                    Text = "Hey, how's the project going?",
                    Timestamp = DateTime.UtcNow.AddMinutes(-5),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[1].Id,
                    UserId = users[0].Id,
                    Text = "Making good progress!",
                    Timestamp = DateTime.UtcNow.AddMinutes(-4),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[2].Id,
                    UserId = users[1].Id,
                    Text = "Hi! Do you have time to chat?",
                    Timestamp = DateTime.UtcNow.AddMinutes(-2),
                    IsSystemMessage = false
                }
            };
            context.Messages.AddRange(messages);
            context.SaveChanges();
        }
    }
}