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
                new User { Username = "Саня", AvatarUrl = "https://i.pravatar.cc/150?img=12" },
                new User { Username = "Олег", AvatarUrl = "https://i.pravatar.cc/150?img=33" },
                new User { Username = "Наташка", AvatarUrl = "https://i.pravatar.cc/150?img=47" },
                new User { Username = "Димон", AvatarUrl = "https://i.pravatar.cc/150?img=68" },
                new User { Username = "Женька", AvatarUrl = "https://i.pravatar.cc/150?img=32" }
            };
            context.Users.AddRange(users);
            context.SaveChanges();

            var chats = new Chat[]
            {
                new Chat
                {
                    Name = "Братва рвётся к власти",
                    Type = ChatType.Group,
                    IsPinned = true,
                    IsFavorite = false,
                    CreatedAt = DateTime.UtcNow.AddDays(-7),
                    UpdatedAt = DateTime.UtcNow.AddMinutes(-10)
                },
                new Chat
                {
                    Name = "Работка",
                    Type = ChatType.Group,
                    IsPinned = false,
                    IsFavorite = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-3),
                    UpdatedAt = DateTime.UtcNow.AddMinutes(-5)
                },
                new Chat
                {
                    Name = "Наташка",
                    Type = ChatType.Friend,
                    IsPinned = false,
                    IsFavorite = false,
                    CreatedAt = DateTime.UtcNow.AddDays(-1),
                    UpdatedAt = DateTime.UtcNow.AddMinutes(-2)
                },
                new Chat
                {
                    Name = "Пацаны на шаурму 🌯 | живёёёём",
                    Type = ChatType.Group,
                    IsPinned = false,
                    IsFavorite = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-5),
                    UpdatedAt = DateTime.UtcNow.AddMinutes(-30)
                }
            };
            context.Chats.AddRange(chats);
            context.SaveChanges();

            chats[0].Users.Add(users[0]);
            chats[0].Users.Add(users[1]);
            chats[0].Users.Add(users[2]);
            chats[0].Users.Add(users[4]);
            chats[0].Users.Add(users[5]);

            chats[1].Users.Add(users[0]);
            chats[1].Users.Add(users[1]);
            chats[1].Users.Add(users[3]);
            chats[1].Users.Add(users[4]);

            chats[2].Users.Add(users[0]);
            chats[2].Users.Add(users[3]);

            chats[3].Users.Add(users[0]);
            chats[3].Users.Add(users[1]);
            chats[3].Users.Add(users[2]);
            chats[3].Users.Add(users[4]);

            context.SaveChanges();

            var messages = new Message[]
            {
                new Message
                {
                    ChatId = chats[0].Id,
                    UserId = null,
                    Text = "Олег добавил вас в чат",
                    Timestamp = DateTime.UtcNow.AddDays(-7),
                    IsSystemMessage = true
                },
                new Message
                {
                    ChatId = chats[0].Id,
                    UserId = users[2].Id,
                    Text = "Салам алейкум, братва!",
                    Timestamp = DateTime.UtcNow.AddDays(-7).AddMinutes(1),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[0].Id,
                    UserId = users[4].Id,
                    Text = "Алейкум салам! Че как дела?",
                    Timestamp = DateTime.UtcNow.AddDays(-7).AddMinutes(2),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[0].Id,
                    UserId = users[5].Id,
                    Text = "Нормас, на работе сижу",
                    Timestamp = DateTime.UtcNow.AddMinutes(-10),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[1].Id,
                    UserId = users[3].Id,
                    Text = "Ребят, кто делал отчёт по последнему спринту?",
                    Timestamp = DateTime.UtcNow.AddMinutes(-5),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[1].Id,
                    UserId = users[1].Id,
                    Text = "Я сделал, сейчас скину",
                    Timestamp = DateTime.UtcNow.AddMinutes(-4),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[1].Id,
                    UserId = users[4].Id,
                    Text = "Красава, дядь!",
                    Timestamp = DateTime.UtcNow.AddMinutes(-3),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[2].Id,
                    UserId = users[3].Id,
                    Text = "Привет! Как сам?",
                    Timestamp = DateTime.UtcNow.AddMinutes(-2),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[2].Id,
                    UserId = users[1].Id,
                    Text = "Норм, делаю тестовое задание",
                    Timestamp = DateTime.UtcNow.AddMinutes(-1),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[3].Id,
                    UserId = users[2].Id,
                    Text = "Пацаны, кто на шаурму?",
                    Timestamp = DateTime.UtcNow.AddMinutes(-30),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[3].Id,
                    UserId = users[4].Id,
                    Text = "Можешь мне взять? С сырным соусом только без лука и больше красного",
                    Timestamp = DateTime.UtcNow.AddMinutes(-29),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[3].Id,
                    UserId = users[1].Id,
                    Text = "Погнали, через 10 минут возле Алика",
                    Timestamp = DateTime.UtcNow.AddMinutes(-28),
                    IsSystemMessage = false
                }
            };
            context.Messages.AddRange(messages);
            context.SaveChanges();
        }
    }
}