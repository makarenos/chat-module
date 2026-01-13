import type { Chat } from '../../types';
import './ChatItem.css';

interface ChatItemProps {
    chat: Chat;
    isSelected: boolean;
    onClick: () => void;
    onTogglePin?: (chatId: number) => void;
    isMuted: boolean;
    onToggleMute: (chatId: number) => void;
}

export default function ChatItem({ chat, isSelected, onClick, onTogglePin, isMuted, onToggleMute }: ChatItemProps) {
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

    const handleMuteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleMute(chat.id);
    };

    return (
        <div
            className={`chat-item ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
        >
            <div className="chat-avatar">
                <img src={getAvatarUrl()} alt={chat.name} />
                {chat.type === 'Group' && chat.users.length > 1 && (
                    <div className="avatar-badge">{chat.users.length}</div>
                )}
            </div>

            <div className="chat-content">
                <div className="chat-header">
                    <h3 className="chat-name">{chat.name}</h3>
                    <span className="chat-time">{formatTime(chat.updatedAt)}</span>
                </div>
                <div className="chat-footer">
                    <p className="chat-preview">{chat.lastMessage}</p>
                    <div className="chat-badges">
                        <svg
                            className={`mute-icon ${isMuted ? 'muted' : ''}`}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            onClick={handleMuteClick}
                            title={isMuted ? 'Unmute' : 'Mute'}
                        >
                            {isMuted ? (
                                <>
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                    <line x1="23" y1="9" x2="17" y2="15"></line>
                                    <line x1="17" y1="9" x2="23" y2="15"></line>
                                </>
                            ) : (
                                <>
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                                </>
                            )}
                        </svg>

                        <svg
                            className={`pin-icon ${chat.isPinned ? 'pinned' : ''}`}
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            onClick={handlePinClick}
                            title={chat.isPinned ? 'Unpin chat' : 'Pin chat'}
                        >
                            <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-.512.195-.707 0-.195-.195-.195-.512 0-.707L4.232 9.36 1.404 6.533a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}