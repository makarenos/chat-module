import { useState, useEffect } from 'react';
import type { Chat, Message, TabType } from './types';
import { api } from './services/api';
import './App.css';
import Tabs from './components/Tabs';
import SearchBar from './components/Sidebar/SearchBar';
import ChatItem from './components/Sidebar/ChatItem';
import ChatHeader from './components/ChatWindow/ChatHeader';
import MessageList from './components/ChatWindow/MessageList';
import MessageInput from './components/ChatWindow/MessageInput';

function App() {
    const [chats, setChats] = useState<Chat[]>([]);
    const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [activeTab, setActiveTab] = useState<TabType>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const CURRENT_USER_ID = 1;

    useEffect(() => {
        loadChats();
    }, []);

    useEffect(() => {
        if (selectedChatId) {
            loadMessages(selectedChatId);
        }
    }, [selectedChatId]);

    const loadChats = async () => {
        try {
            const data = await api.getChats();
            setChats(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to load chats:', error);
            setLoading(false);
        }
    };

    const loadMessages = async (chatId: number) => {
        try {
            const data = await api.getMessages(chatId);
            setMessages(data);
        } catch (error) {
            console.error('Failed to load messages:', error);
        }
    };

    const handleSendMessage = async (text: string) => {
        if (!selectedChatId || !text.trim()) return;

        try {
            const newMessage = await api.sendMessage({
                chatId: selectedChatId,
                text: text.trim(),
            });

            setMessages([...messages, newMessage]);

            const updatedChats = chats.map(chat =>
                chat.id === selectedChatId
                    ? { ...chat, lastMessage: text.trim(), updatedAt: newMessage.timestamp }
                    : chat
            );
            setChats(updatedChats);
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    const filteredChats = chats.filter(chat => {
        const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase());

        if (activeTab === 'All') return matchesSearch;
        if (activeTab === 'Groups') return matchesSearch && chat.type === 'Group';
        if (activeTab === 'Friends') return matchesSearch && chat.type === 'Friend';
        if (activeTab === 'Favorites') return matchesSearch && chat.isFavorite;

        return matchesSearch;
    });

    const pinnedChats = filteredChats.filter(chat => chat.isPinned);
    const regularChats = filteredChats.filter(chat => !chat.isPinned);

    const selectedChat = chats.find(c => c.id === selectedChatId);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="app">
            <aside className="sidebar">
                <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
                <SearchBar value={searchQuery} onChange={setSearchQuery} />

                <div className="chat-list">
                    {pinnedChats.length > 0 && (
                        <div className="chat-section">
                            <div className="section-header">Pinned Chats</div>
                            {pinnedChats.map(chat => (
                                <ChatItem
                                    key={chat.id}
                                    chat={chat}
                                    isSelected={selectedChatId === chat.id}
                                    onClick={() => setSelectedChatId(chat.id)}
                                />
                            ))}
                        </div>
                    )}

                    {regularChats.length > 0 && (
                        <div className="chat-section">
                            {pinnedChats.length > 0 && (
                                <div className="section-header">All Chats</div>
                            )}
                            {regularChats.map(chat => (
                                <ChatItem
                                    key={chat.id}
                                    chat={chat}
                                    isSelected={selectedChatId === chat.id}
                                    onClick={() => setSelectedChatId(chat.id)}
                                />
                            ))}
                        </div>
                    )}

                    {filteredChats.length === 0 && (
                        <div className="empty-state">
                            <p>No chats found</p>
                        </div>
                    )}
                </div>
            </aside>

            <main className="chat-window">
                {selectedChat ? (
                    <>
                        <ChatHeader chat={selectedChat} />
                        <MessageList messages={messages} currentUserId={CURRENT_USER_ID} />
                        <MessageInput onSend={handleSendMessage} />
                    </>
                ) : (
                    <div className="chat-window-empty">
                        <p>Select a chat to start messaging</p>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;