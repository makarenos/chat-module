import React from 'react';
import type { Chat } from '../../types';
import './ChatItem.css';
import heartIcon from '../../assets/icons/heart-icon.svg';
import soundOnIcon from '../../assets/icons/sound-on-icon.svg';
import pinIcon from '../../assets/icons/pin-icon.svg';
import messageIcon from '../../assets/icons/message.svg';

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

    return (
        <div
            className={`chat-item ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
        >
            {unreadCount > 0 && (
                <div className={`message-badge ${unreadCount > 99 ? 'large-count' : ''} new`}>
                    {unreadCount > 99 ? '99+' : unreadCount}
                </div>
            )}

            <div className="chat-avatar">
                <img src={getAvatarUrl()} alt={chat.name} />
                {chat.type === 'Group' && chat.users.length > 1 && (
                    <div className="avatar-badge">{chat.users.length}</div>
                )}
            </div>

            <div className="chat-content">
                <div className="chat-header">
                    <div className="chat-info">
                        <h3 className="chat-name">{chat.name}</h3>
                        <p className="chat-preview">{chat.lastMessage}</p>
                    </div>
                    <div className="chat-meta">
                        <span className="chat-time">{formatTime(chat.updatedAt)}</span>
                        <div className="chat-actions">
                            <img
                                src={heartIcon}
                                alt="favorite"
                                className={`chat-action-icon favorite-icon ${isFavorite ? 'active' : ''}`}
                                onClick={handleFavoriteClick}
                            />

                            <img
                                src={soundOnIcon}
                                alt="sound"
                                className={`chat-action-icon sound-icon ${isMuted ? 'muted' : ''}`}
                                onClick={handleMuteClick}
                            />

                            <img
                                src={pinIcon}
                                alt="pin"
                                className={`chat-action-icon pin-icon ${chat.isPinned ? 'pinned' : ''}`}
                                onClick={handlePinClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}