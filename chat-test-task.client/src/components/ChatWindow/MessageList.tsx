import { useEffect, useRef } from 'react';
import type { Message as MessageType } from '../../types';
import Message from './Message';
import './MessageList.css';

interface MessageListProps {
    messages: MessageType[];
    currentUserId: number;
}

export default function MessageList({ messages, currentUserId }: MessageListProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (messages.length === 0) {
        return (
            <div className="messages-empty">
                <p>No messages yet. Start the conversation!</p>
            </div>
        );
    }

    return (
        <div className="messages-list">
            {messages.map((message) => {
                const isCurrentUser = message.userId === currentUserId && !message.isSystemMessage;

                return (
                    <Message
                        key={message.id}
                        message={message}
                        isCurrentUser={isCurrentUser}
                    />
                );
            })}
            <div ref={messagesEndRef} />
        </div>
    );
}