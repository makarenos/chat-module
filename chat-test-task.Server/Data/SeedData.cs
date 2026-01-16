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
                    UpdatedAt = DateTime.UtcNow.AddMinutes(-1)
                },
                new Chat
                {
                    Name = "Работка",
                    Type = ChatType.Group,
                    IsPinned = false,
                    IsFavorite = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-3),
                    UpdatedAt = DateTime.UtcNow.AddMinutes(-2)
                },
                new Chat
                {
                    Name = "Наташка",
                    Type = ChatType.Friend,
                    IsPinned = false,
                    IsFavorite = false,
                    CreatedAt = DateTime.UtcNow.AddDays(-1),
                    UpdatedAt = DateTime.UtcNow.AddMinutes(-5)
                },
                new Chat
                {
                    Name = "Пацаны на шаурму 🌯 | живёёёём",
                    Type = ChatType.Group,
                    IsPinned = false,
                    IsFavorite = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-5),
                    UpdatedAt = DateTime.UtcNow.AddMinutes(-8)
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
                    UserId = users[2].Id,
                    Text = "добавил вас в чат",
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
                    ChatId = chats[0].Id,
                    UserId = users[2].Id,
                    Text = "Guys, who's online right now?",
                    Timestamp = DateTime.UtcNow.AddMinutes(-5),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[0].Id,
                    UserId = users[4].Id,
                    Text = "I'm here, what's up?",
                    Timestamp = DateTime.UtcNow.AddMinutes(-4),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[0].Id,
                    UserId = users[2].Id,
                    Text = "Need someone to review my code",
                    Timestamp = DateTime.UtcNow.AddMinutes(-3),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[0].Id,
                    UserId = users[5].Id,
                    Text = "Let's take a look together",
                    Timestamp = DateTime.UtcNow.AddMinutes(-2),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[0].Id,
                    UserId = users[4].Id,
                    Text = "Alright, send me the link",
                    Timestamp = DateTime.UtcNow.AddMinutes(-1),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[1].Id,
                    UserId = users[3].Id,
                    Text = "Hey team, did anyone finish the sprint report?",
                    Timestamp = DateTime.UtcNow.AddMinutes(-20),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[1].Id,
                    UserId = users[1].Id,
                    Text = "I did, sending it now",
                    Timestamp = DateTime.UtcNow.AddMinutes(-18),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[1].Id,
                    UserId = users[4].Id,
                    Text = "Thanks man, you're the best!",
                    Timestamp = DateTime.UtcNow.AddMinutes(-15),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[1].Id,
                    UserId = users[3].Id,
                    Text = "How much longer on this bug fix?",
                    Timestamp = DateTime.UtcNow.AddMinutes(-12),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[1].Id,
                    UserId = users[1].Id,
                    Text = "Almost done, couple more hours",
                    Timestamp = DateTime.UtcNow.AddMinutes(-10),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[1].Id,
                    UserId = users[4].Id,
                    Text = "I can help if you need",
                    Timestamp = DateTime.UtcNow.AddMinutes(-8),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[1].Id,
                    UserId = users[1].Id,
                    Text = "Thanks, I'm good for now",
                    Timestamp = DateTime.UtcNow.AddMinutes(-2),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[2].Id,
                    UserId = users[3].Id,
                    Text = "Hey! How are you doing?",
                    Timestamp = DateTime.UtcNow.AddMinutes(-15),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[2].Id,
                    UserId = users[1].Id,
                    Text = "Good! Working on a test task",
                    Timestamp = DateTime.UtcNow.AddMinutes(-12),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[2].Id,
                    UserId = users[3].Id,
                    Text = "Oh nice! Tell me how it goes later?",
                    Timestamp = DateTime.UtcNow.AddMinutes(-10),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[2].Id,
                    UserId = users[1].Id,
                    Text = "Sure thing! So far so good actually",
                    Timestamp = DateTime.UtcNow.AddMinutes(-8),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[2].Id,
                    UserId = users[3].Id,
                    Text = "That's awesome! Keep it up 💪",
                    Timestamp = DateTime.UtcNow.AddMinutes(-5),
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
                },
                new Message
                {
                    ChatId = chats[3].Id,
                    UserId = users[2].Id,
                    Text = "Who's getting shawarma?",
                    Timestamp = DateTime.UtcNow.AddMinutes(-20),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[3].Id,
                    UserId = users[4].Id,
                    Text = "I can go grab some",
                    Timestamp = DateTime.UtcNow.AddMinutes(-18),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[3].Id,
                    UserId = users[1].Id,
                    Text = "Get me one too, chicken please",
                    Timestamp = DateTime.UtcNow.AddMinutes(-15),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[3].Id,
                    UserId = users[5].Id,
                    Text = "Beef for me, no onions",
                    Timestamp = DateTime.UtcNow.AddMinutes(-12),
                    IsSystemMessage = false
                },
                new Message
                {
                    ChatId = chats[3].Id,
                    UserId = users[4].Id,
                    Text = "Got it, heading out in 10 mins",
                    Timestamp = DateTime.UtcNow.AddMinutes(-8),
                    IsSystemMessage = false
                }
            };
            context.Messages.AddRange(messages);
            context.SaveChanges();
        }
    }
}