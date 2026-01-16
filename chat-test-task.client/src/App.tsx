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
    const [mutedChats, setMutedChats] = useState<Set<number>>(new Set());
    const [pinnedChats, setPinnedChats] = useState<Set<number>>(new Set());
    const [favoriteChats, setFavoriteChats] = useState<Set<number>>(new Set());

    useEffect(() => {
        const savedMuted = localStorage.getItem('mutedChats');
        if (savedMuted) {
            setMutedChats(new Set(JSON.parse(savedMuted)));
        }

        const savedPinned = localStorage.getItem('pinnedChats');
        if (savedPinned) {
            setPinnedChats(new Set(JSON.parse(savedPinned)));
        }

        const savedFavorite = localStorage.getItem('favoriteChats');
        if (savedFavorite) {
            setFavoriteChats(new Set(JSON.parse(savedFavorite)));
        }

        loadChats();
    }, []);

    const loadChats = async () => {
        try {
            const data = await api.getChats();

            const savedPinned = localStorage.getItem('pinnedChats');
            const savedFavorite = localStorage.getItem('favoriteChats');
            const pinnedSet = savedPinned ? new Set(JSON.parse(savedPinned)) : new Set();
            const favoriteSet = savedFavorite ? new Set(JSON.parse(savedFavorite)) : new Set();

            const mergedChats = data.map(chat => ({
                ...chat,
                isPinned: pinnedSet.has(chat.id),
                isFavorite: favoriteSet.has(chat.id)
            }));

            setChats(mergedChats);

            if (mergedChats.length > 0 && !selectedChat) {
                setSelectedChat(mergedChats[0]);
            }
        } catch (error) {
            console.error('Failed to load chats:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChatSelect = (chat: Chat) => {
        setSelectedChat(chat);

        setChats(prevChats =>
            prevChats.map(c =>
                c.id === chat.id
                    ? { ...c, unreadCount: 0 }
                    : c
            )
        );
    };

    const handleCreateChat = (name: string, type: 'Group' | 'Friend') => {
        const newChat: Chat = {
            id: Date.now(),
            name,
            type,
            isPinned: false,
            isFavorite: false,
            updatedAt: new Date().toISOString(),
            lastMessage: '',
            users: [],
            unreadCount: 0
        };

        setChats(prevChats => [newChat, ...prevChats]);
        setSelectedChat(newChat);
    };

    const handleMessageSent = async () => {
        await loadChats();
    };

    const handleTogglePin = (chatId: number) => {
        setPinnedChats(prev => {
            const newPinned = new Set(prev);
            if (newPinned.has(chatId)) {
                newPinned.delete(chatId);
            } else {
                newPinned.add(chatId);
            }
            localStorage.setItem('pinnedChats', JSON.stringify([...newPinned]));
            return newPinned;
        });

        setChats(prevChats =>
            prevChats.map(chat =>
                chat.id === chatId
                    ? { ...chat, isPinned: !chat.isPinned }
                    : chat
            )
        );
    };

    const handleToggleFavorite = (chatId: number) => {
        setFavoriteChats(prev => {
            const newFavorite = new Set(prev);
            if (newFavorite.has(chatId)) {
                newFavorite.delete(chatId);
            } else {
                newFavorite.add(chatId);
            }
            localStorage.setItem('favoriteChats', JSON.stringify([...newFavorite]));
            return newFavorite;
        });

        setChats(prevChats =>
            prevChats.map(chat =>
                chat.id === chatId
                    ? { ...chat, isFavorite: !chat.isFavorite }
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
                onChatSelect={handleChatSelect}
                onTogglePin={handleTogglePin}
                onToggleFavorite={handleToggleFavorite}
                mutedChats={mutedChats}
                onToggleMute={handleToggleMute}
                onCreateChat={handleCreateChat}
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