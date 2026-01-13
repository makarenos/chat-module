import { useState, useRef, useEffect } from 'react';
import type { Chat } from '../../types';
import './ChatHeader.css';

interface ChatHeaderProps {
    chat: Chat;
    onToggleMute?: (chatId: number) => void;
}

export default function ChatHeader({ chat, onToggleMute }: ChatHeaderProps) {
    const [showMenu, setShowMenu] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const userCount = chat.users.length;

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        }

        if (showMenu) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [showMenu]);

    const handleMuteClick = () => {
        if (onToggleMute) {
            onToggleMute(chat.id);
        }
    };

    return (
        <>
            <div className="chat-header">
                <div className="chat-header-info">
                    <h2 className="chat-header-title">{chat.name}</h2>
                    <span className="chat-header-subtitle">
                        {chat.type === 'Group' ? `${userCount} Users` : 'Direct Message'}
                    </span>
                </div>
                <div className="chat-header-actions">
                    <button
                        className="header-btn"
                        title="Mute notifications"
                        onClick={handleMuteClick}
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"/>
                        </svg>
                    </button>
                    <button
                        className="header-btn"
                        title="Video call"
                        onClick={() => setShowVideoModal(true)}
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="23 7 16 12 23 17 23 7"/>
                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                        </svg>
                    </button>
                    <div ref={menuRef} style={{ position: 'relative' }}>
                        <button
                            className="header-btn"
                            title="More options"
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="1"/>
                                <circle cx="19" cy="12" r="1"/>
                                <circle cx="5" cy="12" r="1"/>
                            </svg>
                        </button>
                        {showMenu && (
                            <div className="header-menu">
                                <button className="menu-item" onClick={() => setShowMenu(false)}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                        <circle cx="9" cy="7" r="4"/>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                    </svg>
                                    View Members
                                </button>
                                <button className="menu-item" onClick={() => setShowMenu(false)}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                                        <path d="M2 17l10 5 10-5"/>
                                        <path d="M2 12l10 5 10-5"/>
                                    </svg>
                                    Shared Media
                                </button>
                                <button className="menu-item" onClick={() => setShowMenu(false)}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                        <circle cx="8.5" cy="7" r="4"/>
                                        <line x1="20" y1="8" x2="20" y2="14"/>
                                        <line x1="23" y1="11" x2="17" y2="11"/>
                                    </svg>
                                    Add Members
                                </button>
                                <button className="menu-item" onClick={() => setShowMenu(false)}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="3 6 5 6 21 6"/>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                    </svg>
                                    Clear History
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showVideoModal && (
                <div className="modal-overlay" onClick={() => setShowVideoModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3 className="modal-title">Feature In Development</h3>
                        <p className="modal-message">
                            Video calling feature is currently under development and will be available soon!
                        </p>
                        <button
                            className="modal-button"
                            onClick={() => setShowVideoModal(false)}
                        >
                            Got it
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}