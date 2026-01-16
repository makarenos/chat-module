import { useState } from 'react';
import './SearchBar.css';
import searchIcon from '../../assets/icons/search-icon.svg';
import newChatIcon from '../../assets/icons/new-chat.svg';
import NewChatModal from './NewChatModal';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onCreateChat?: (name: string, type: 'Group' | 'Friend') => void;
}

export default function SearchBar({ value, onChange, onCreateChat }: SearchBarProps) {
    const [showModal, setShowModal] = useState(false);

    const handleCreateChat = (name: string, type: 'Group' | 'Friend') => {
        if (onCreateChat) {
            onCreateChat(name, type);
        }
    };

    return (
        <>
            <div className="search-bar">
                <div className="search-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search chats by Username"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="search-input"
                    />
                    <img src={searchIcon} alt="Search" className="search-icon" />
                </div>
                <button
                    className="search-action-btn"
                    title="New chat"
                    onClick={() => setShowModal(true)}
                >
                    <img src={newChatIcon} alt="New chat" />
                </button>
            </div>

            {showModal && (
                <NewChatModal
                    onClose={() => setShowModal(false)}
                    onCreateChat={handleCreateChat}
                />
            )}
        </>
    );
}