import { useState, KeyboardEvent, useRef } from 'react';
import './MessageInput.css';

interface MessageInputProps {
    onSend: (text: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
    const [text, setText] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const emojis = [
        '😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊',
        '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘',
        '😗', '😙', '😚', '🤗', '🤩', '🤔', '🤨', '😐',
        '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐',
        '😯', '😪', '😫', '🥱', '😴', '👍', '👎', '👌',
        '✌️', '🤞', '🤟', '🤘', '🤙', '👏', '🙌', '🤲',
        '🤝', '🙏', '✍️', '💪', '❤️', '🧡', '💛', '💚',
        '💙', '💜', '🖤', '🤍', '🤎', '💔', '💕', '💞',
        '💓', '💗', '💖', '💘', '💝', '💯', '🔥', '✨',
        '⭐', '🌟', '💫', '🎉', '🎊', '🎈', '🎁', '🎀',
        '🏆', '🥇', '🥈', '🥉', '⚽', '🏀', '🏈', '⚾',
        '🥎', '🎾', '🏐', '🏉', '🎱', '🪀', '🏓', '🏸',
        '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳', '🪁'
    ];

    const handleSend = () => {
        if (text.trim()) {
            onSend(text.trim());
            setText('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleEmojiClick = (emoji: string) => {
        setText(text + emoji);
        setShowEmojiPicker(false);
    };

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log('File selected:', file.name);
            alert(`File selected: ${file.name}\n(File upload is UI-only for demo)`);
        }
    };

    const handleVoiceClick = () => {
        setIsRecording(!isRecording);
        if (!isRecording) {
            setTimeout(() => {
                setIsRecording(false);
                alert('Voice recording completed!\n(Voice recording is UI-only for demo)');
            }, 2000);
        }
    };

    return (
        <div className="message-input-container">
            <div style={{ position: 'relative' }}>
                <button
                    className="input-btn"
                    type="button"
                    title="Emoji"
                    aria-label="Add emoji"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <circle cx="9" cy="9" r="0.5" fill="currentColor"/>
                        <circle cx="15" cy="9" r="0.5" fill="currentColor"/>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                    </svg>
                </button>

                {showEmojiPicker && (
                    <div className="emoji-picker">
                        {emojis.map((emoji, index) => (
                            <button
                                key={index}
                                type="button"
                                className="emoji-item"
                                onClick={() => handleEmojiClick(emoji)}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/*,.pdf,.doc,.docx,.txt"
            />

            <button
                className="input-btn"
                type="button"
                title="Attach file"
                aria-label="Attach file"
                onClick={handleFileClick}
            >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                </svg>
            </button>

            <input
                type="text"
                className="message-input"
                placeholder="Type your Message"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            <button
                className={`input-btn ${isRecording ? 'recording' : ''}`}
                type="button"
                title="Voice message"
                aria-label="Voice message"
                onClick={handleVoiceClick}
            >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                    <line x1="12" y1="19" x2="12" y2="23"/>
                    <line x1="8" y1="23" x2="16" y2="23"/>
                </svg>
            </button>

            <button
                className="send-btn"
                type="button"
                onClick={handleSend}
                disabled={!text.trim()}
                title="Send message"
                aria-label="Send message"
            >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
            </button>
        </div>
    );
}