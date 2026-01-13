import { useState, useEffect } from 'react';
import type { Chat } from './types';
import { api } from './services/api';
import Sidebar from './components/Sidebar/Sidebar';
import ChatWindow from './components/ChatWindow/ChatWindow';
import './App.css';

function App() {
    const [chats, setChats] = useState<Chat[]>([]);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [mutedChats, setMutedChats] = useState<Set<number>>(new Set());

    useEffect(() => {
        loadChats();
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);

        const savedMuted = localStorage.getItem('mutedChats');
        if (savedMuted) {
            setMutedChats(new Set(JSON.parse(savedMuted)));
        }
    }, []);

    const loadChats = async () => {
        try {
            const data = await api.getChats();
            setChats(data);
            if (data.length > 0 && !selectedChat) {
                setSelectedChat(data[0]);
            }
        } catch (error) {
            console.error('Failed to load chats:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMessageSent = async () => {
        await loadChats();
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const handleTogglePin = (chatId: number) => {
        setChats(prevChats =>
            prevChats.map(chat =>
                chat.id === chatId
                    ? { ...chat, isPinned: !chat.isPinned }
                    : chat
            )
        );
    };

    const handleToggleMute = (chatId: number) => {
        setMutedChats(prev => {
            const newMuted = new Set(prev);
            if (newMuted.has(chatId)) {
                newMuted.delete(chatId);
            } else {
                newMuted.add(chatId);
            }
            localStorage.setItem('mutedChats', JSON.stringify([...newMuted]));
            return newMuted;
        });
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="app">
            <Sidebar
                chats={chats}
                selectedChatId={selectedChat?.id || null}
                onChatSelect={setSelectedChat}
                onTogglePin={handleTogglePin}
                theme={theme}
                onToggleTheme={toggleTheme}
                mutedChats={mutedChats}
                onToggleMute={handleToggleMute}
            />

            {selectedChat ? (
                <ChatWindow
                    chat={selectedChat}
                    onMessageSent={handleMessageSent}
                    onToggleMute={handleToggleMute}
                />
            ) : (
                <div className="chat-window-empty">
                    <p>Select a chat to start messaging</p>
                </div>
            )}
        </div>
    );
}

export default App;