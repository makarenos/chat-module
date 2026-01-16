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
    onTogglePin: (chatId: number) => void;
    onToggleFavorite: (chatId: number) => void;
    mutedChats: Set<number>;
    onToggleMute: (chatId: number) => void;
    onCreateChat?: (name: string, type: 'Group' | 'Friend') => void;
}

export default function Sidebar({
                                    chats,
                                    selectedChatId,
                                    onChatSelect,
                                    onTogglePin,
                                    onToggleFavorite,
                                    mutedChats,
                                    onToggleMute,
                                    onCreateChat
                                }: SidebarProps) {
    const [activeTab, setActiveTab] = useState<TabType>('All');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="sidebar">
            <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
            <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onCreateChat={onCreateChat}
            />
            <ChatList
                chats={chats}
                activeTab={activeTab}
                searchQuery={searchQuery}
                selectedChatId={selectedChatId}
                onChatSelect={onChatSelect}
                onTogglePin={onTogglePin}
                onToggleFavorite={onToggleFavorite}
                mutedChats={mutedChats}
                onToggleMute={onToggleMute}
            />
        </div>
    );
}