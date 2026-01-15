import './SearchBar.css';
import searchIcon from '../../assets/icons/search-icon.svg';
import newChatIcon from '../../assets/icons/new-chat.svg';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="search-bar">
            <svg
                className="search-icon"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
            >
                <path
                    d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <input
                type="text"
                placeholder="Search chats by Username"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="search-input"
            />
            <button className="search-action-btn" title="Search">
                <img src={searchIcon} alt="Search" style={{ width: '20px', height: '20px' }} />
            </button>
            <button className="search-action-btn" title="New chat">
                <img src={newChatIcon} alt="New chat" style={{ width: '20px', height: '20px' }} />
            </button>
        </div>
    );
}