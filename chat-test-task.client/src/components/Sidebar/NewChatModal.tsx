import { useState } from 'react';
import './NewChatModal.css';

interface NewChatModalProps {
    onClose: () => void;
    onCreateChat: (name: string, type: 'Group' | 'Friend') => void;
}

export default function NewChatModal({ onClose, onCreateChat }: NewChatModalProps) {
    const [chatName, setChatName] = useState('');
    const [chatType, setChatType] = useState<'Group' | 'Friend'>('Group');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (chatName.trim()) {
            onCreateChat(chatName.trim(), chatType);
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Create New Chat</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label htmlFor="chat-name">Chat Name</label>
                        <input
                            id="chat-name"
                            type="text"
                            value={chatName}
                            onChange={(e) => setChatName(e.target.value)}
                            placeholder="Enter chat name..."
                            autoFocus
                            className="modal-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Chat Type</label>
                        <div className="chat-type-options">
                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="chatType"
                                    value="Group"
                                    checked={chatType === 'Group'}
                                    onChange={(e) => setChatType(e.target.value as 'Group')}
                                />
                                <span>Group Chat</span>
                            </label>
                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="chatType"
                                    value="Friend"
                                    checked={chatType === 'Friend'}
                                    onChange={(e) => setChatType(e.target.value as 'Friend')}
                                />
                                <span>Friend Chat</span>
                            </label>
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">
                            Cancel
                        </button>
                        <button type="submit" className="btn-create" disabled={!chatName.trim()}>
                            Create Chat
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}