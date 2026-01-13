import { useState, useEffect } from 'react';
import type { Chat, Message } from '../../types';
import { getMessages, sendMessage } from '../../services/api';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import './ChatWindow.css';

interface ChatWindowProps {
    chat: Chat;
    onMessageSent?: () => void;
    onToggleMute: (chatId: number) => void;
}

export default function ChatWindow({ chat, onMessageSent, onToggleMute }: ChatWindowProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    const currentUserId = 1;

    useEffect(() => {
        loadMessages();
    }, [chat.id]);

    const loadMessages = async () => {
        setLoading(true);
        try {
            const data = await getMessages(chat.id);
            setMessages(data);
        } catch (error) {
            console.error('Failed to load messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async (text: string) => {
        try {
            const newMessage = await sendMessage({
                chatId: chat.id,
                text: text
            });
            setMessages([...messages, newMessage]);

            if (onMessageSent) {
                onMessageSent();
            }
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    return (
        <div className="chat-window">
            <ChatHeader chat={chat} onToggleMute={onToggleMute} />

            {loading ? (
                <div className="chat-window-loading">
                    Loading messages...
                </div>
            ) : (
                <MessageList messages={messages} currentUserId={currentUserId} />
            )}

            <MessageInput onSend={handleSendMessage} />
        </div>
    );
}