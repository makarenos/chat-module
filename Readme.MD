# Chat Module - Test Task

ASP.NET Core 8 + React 18 + SQLite

## How to Run

### Option 1: Visual Studio

1. Open `chat-test-task.sln`
2. Press F5
3. Backend: http://localhost:5207
4. Frontend: http://localhost:5173

### Option 2: Command Line

**Backend:**
```bash
cd chat-test-task.Server
dotnet restore  # optional
dotnet run
```

**Frontend:**
```bash
cd chat-test-task.client
npm install
npm run dev
```

## Notes

For production: consider WebSocket/SignalR for real-time message synchronization