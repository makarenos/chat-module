import type { Chat } from '../../types';
import './ChatHeader.css';

interface ChatHeaderProps {
    chat: Chat;
}

export default function ChatHeader({ chat }: ChatHeaderProps) {
    const userCount = chat.users.length;

    return (
        <div className="chat-header">
            <div className="chat-header-info">
                <h2 className="chat-header-title">{chat.name}</h2>
                <span className="chat-header-subtitle">
          {chat.type === 'Group' ? `${userCount} Users` : 'Direct Message'}
        </span>
            </div>
            <div className="chat-header-actions">
                <button className="header-btn" title="Settings">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}