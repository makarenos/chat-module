import { useState } from 'react';
import type { Chat, TabType } from '../../types';
import Tabs from '../Tabs';
import SearchBar from './SearchBar';
import ChatList from './ChatList';
import './Sidebar.css';

interface SidebarProps {
    chats: Chat[];
    selectedChatId: number | null;
    onChatSelect: (chat: Chat) => void;
    onTogglePin?: (chatId: number) => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}

export default function Sidebar({
                                    chats,
                                    selectedChatId,
                                    onChatSelect,
                                    onTogglePin,
                                    theme,
                                    onToggleTheme
                                }: SidebarProps) {
    const [activeTab, setActiveTab] = useState<TabType>('All');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="sidebar">
            <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <ChatList
                chats={chats}
                activeTab={activeTab}
                searchQuery={searchQuery}
                selectedChatId={selectedChatId}
                onChatSelect={onChatSelect}
                onTogglePin={onTogglePin}
            />

            <div className="sidebar-footer">
                <button
                    className="sidebar-theme-toggle"
                    onClick={onToggleTheme}
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    aria-label="Toggle theme"
                >
                    {theme === 'light' ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}