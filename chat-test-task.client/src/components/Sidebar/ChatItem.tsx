import React from 'react';
import type { Chat } from '../../types';
import './ChatItem.css';

interface ChatItemProps {
    chat: Chat;
    isSelected: boolean;
    onClick: () => void;
    onTogglePin?: (chatId: number) => void;
    onToggleFavorite?: (chatId: number) => void;
    onToggleMute?: (chatId: number) => void;
    isMuted?: boolean;
    isFavorite?: boolean;
    unreadCount?: number;
}

export default function ChatItem({
                                     chat,
                                     isSelected,
                                     onClick,
                                     onTogglePin,
                                     onToggleFavorite,
                                     onToggleMute,
                                     isMuted = false,
                                     isFavorite = false,
                                     unreadCount = 0
                                 }: ChatItemProps) {
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return date.toLocaleDateString('en-US', { weekday: 'short' });
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    };

    const getAvatarUrl = () => {
        if (chat.type === 'Friend' && chat.users.length > 1) {
            const otherUser = chat.users.find(u => u.username !== 'CurrentUser');
            return otherUser?.avatarUrl || chat.users[0]?.avatarUrl;
        }
        return chat.users[0]?.avatarUrl;
    };

    const getRealUnreadCount = () => {
        return chat.messages?.filter(msg => !msg.isRead && msg.userId !== 1).length || 0;
    };

    const handlePinClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onTogglePin) {
            onTogglePin(chat.id);
        }
    };

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onToggleFavorite) {
            onToggleFavorite(chat.id);
        }
    };

    const handleMuteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onToggleMute) {
            onToggleMute(chat.id);
        }
    };

    const realUnreadCount = getRealUnreadCount();

    return (
        <div
            className={`chat-item ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
        >
            {realUnreadCount > 0 && (
                <div className={`message-badge ${realUnreadCount > 99 ? 'large-count' : ''}`}>
                    {realUnreadCount > 99 ? '99+' : realUnreadCount}
                </div>
            )}

            <div className="chat-avatar">
                <img src={getAvatarUrl()} alt={chat.name} />
            </div>

            <div className="chat-content">
                <div className="chat-header">
                    <div className="chat-info">
                        <h3 className="chat-name">{chat.name}</h3>
                        <p className="chat-preview">{chat.lastMessage}</p>
                    </div>
                    <div className="chat-meta">
                        <div className="chat-top-row">
                            <span className="chat-time">{formatTime(chat.updatedAt)}</span>
                            <svg
                                className={`chat-action-icon favorite-icon ${isFavorite ? 'active' : ''}`}
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill={isFavorite ? '#ff4757' : 'none'}
                                stroke="currentColor"
                                strokeWidth="2"
                                onClick={handleFavoriteClick}
                            >
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                        </div>
                        <div className="chat-bottom-row">
                            <svg
                                className={`chat-action-icon sound-icon ${isMuted ? 'muted' : ''}`}
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                onClick={handleMuteClick}
                            >
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                            </svg>
                            <svg
                                className={`chat-action-icon pin-icon ${chat.isPinned ? 'pinned' : ''}`}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                onClick={handlePinClick}
                            >
                                <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-.512.195-.707 0-.195-.195-.195-.512 0-.707L4.232 9.36 1.404 6.533a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a .5.5 0 0 1 .353-.146z"/>
                            </svg>
                        </div>
                    </div>
                    <svg
                        className="chat-options-separate"
                        width="6"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <circle cx="12" cy="12" r="2"/>
                        <circle cx="12" cy="5" r="2"/>
                        <circle cx="12" cy="19" r="2"/>
                    </svg>
                </div>
            </div>
        </div>
    );
}