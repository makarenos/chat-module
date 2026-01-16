import type { Message as MessageType } from '../../types';
import './Message.css';

interface MessageProps {
    message: MessageType;
    isCurrentUser: boolean;
}

export default function Message({ message, isCurrentUser }: MessageProps) {
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    if (message.isSystemMessage) {
        return (
            <div className="message-system">
                <span className="system-text">
                    <span className="system-username">{message.user?.username || 'User'}</span> {message.text}
                </span>
            </div>
        );
    }

    return (
        <div className={`message ${isCurrentUser ? 'message-right' : 'message-left'}`}>
            {!isCurrentUser && message.user && (
                <span className="message-username">{message.user.username}</span>
            )}
            <div className="message-bubble">
                <p className="message-text">{message.text}</p>
                <span className="message-time">{formatTime(message.timestamp)}</span>
            </div>
        </div>
    );
}