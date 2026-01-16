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
            <button className="search-action-btn" title="New chat">
                <img src={newChatIcon} alt="New chat" />
            </button>
        </div>
    );
}