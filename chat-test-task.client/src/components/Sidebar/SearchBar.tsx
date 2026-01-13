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
            {value && (
                <button
                    className="clear-btn"
                    onClick={() => onChange('')}
                >
                    ×
                </button>
            )}
        </div>
    );
}