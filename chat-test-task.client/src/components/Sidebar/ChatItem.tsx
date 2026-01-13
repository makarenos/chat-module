import type { Chat } from '../../types';
import './ChatItem.css';

interface ChatItemProps {
    chat: Chat;
    isSelected: boolean;
    onClick: () => void;
}

export default function ChatItem({ chat, isSelected, onClick }: ChatItemProps) {
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
                        {chat.isPinned && (
                            <svg className="pin-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-.512.195-.707 0-.195-.195-.195-.512 0-.707L4.232 9.36 1.404 6.533a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z"/>
                            </svg>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}