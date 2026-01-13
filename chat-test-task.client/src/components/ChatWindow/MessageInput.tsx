import { useState, KeyboardEvent } from 'react';
import './MessageInput.css';

interface MessageInputProps {
    onSend: (text: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
    const [text, setText] = useState('');

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

    return (
        <div className="message-input-container">
            <button className="input-btn" title="Emoji (UI only)">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                    <path d="M7 9c.828 0 1.5-.672 1.5-1.5S7.828 6 7 6s-1.5.672-1.5 1.5S6.172 9 7 9zm6 0c.828 0 1.5-.672 1.5-1.5S13.828 6 13 6s-1.5.672-1.5 1.5S12.172 9 13 9zm-.132 1.5H7.132a.75.75 0 00-.6 1.2 4.5 4.5 0 007.136 0 .75.75 0 00-.6-1.2z"/>
                </svg>
            </button>

            <button className="input-btn" title="Attach file (UI only)">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M16.5 6v11.5c0 1.933-1.567 3.5-3.5 3.5S9.5 19.433 9.5 17.5v-12C9.5 4.121 10.621 3 12 3s2.5 1.121 2.5 2.5v10.044a1 1 0 01-2 0V6.5a.5.5 0 00-1 0v9.044a2 2 0 104 0V5.5C15.5 3.567 13.933 2 12 2S8.5 3.567 8.5 5.5v12c0 2.485 2.015 4.5 4.5 4.5s4.5-2.015 4.5-4.5V6a.5.5 0 00-1 0z"/>
                </svg>
            </button>

            <input
                type="text"
                className="message-input"
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            <button className="input-btn" title="Voice message (UI only)">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 0C8.343 0 7 1.343 7 3v7c0 1.657 1.343 3 3 3s3-1.343 3-3V3c0-1.657-1.343-3-3-3zm1 10c0 .551-.449 1-1 1s-1-.449-1-1V3c0-.551.449-1 1-1s1 .449 1 1v7z"/>
                    <path d="M15 8a1 1 0 00-1 1v1c0 2.206-1.794 4-4 4s-4-1.794-4-4V9a1 1 0 00-2 0v1c0 3.072 2.312 5.605 5.283 5.951V18H7a1 1 0 000 2h6a1 1 0 000-2h-2.283v-2.049C13.688 15.605 16 13.072 16 10V9a1 1 0 00-1-1z"/>
                </svg>
            </button>

            <button
                className="send-btn"
                onClick={handleSend}
                disabled={!text.trim()}
            >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M0 0l20 10L0 20V0zm2 3.5v5l10-2.5L2 3.5zm0 13v-5l10 2.5L2 16.5z"/>
                </svg>
            </button>
        </div>
    );
}