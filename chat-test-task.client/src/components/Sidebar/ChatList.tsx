import { useState } from 'react';
import type { Chat, TabType } from '../../types';
import ChatItem from './ChatItem';
import './ChatList.css';
import collapseIcon from '../../assets/icons/collapse.svg';

interface ChatListProps {
    chats: Chat[];
    activeTab: TabType;
    searchQuery: string;
    selectedChatId: number | null;
    onChatSelect: (chat: Chat) => void;
    onTogglePin?: (chatId: number) => void;
    onToggleFavorite?: (chatId: number) => void;
    mutedChats: Set<number>;
    onToggleMute: (chatId: number) => void;
}

export default function ChatList({
                                     chats,
                                     activeTab,
                                     searchQuery,
                                     selectedChatId,
                                     onChatSelect,
                                     onTogglePin,
                                     onToggleFavorite,
                                     mutedChats,
                                     onToggleMute
                                 }: ChatListProps) {

    const [pinnedCollapsed, setPinnedCollapsed] = useState(false);
    const [unpinnedCollapsed, setUnpinnedCollapsed] = useState(false);

    const filterChats = () => {
        let filtered = chats;

        if (activeTab === 'Groups') {
            filtered = filtered.filter(chat => chat.type === 'Group');
        } else if (activeTab === 'Friends') {
            filtered = filtered.filter(chat => chat.type === 'Friend');
        } else if (activeTab === 'Favorites') {
            filtered = filtered.filter(chat => chat.isFavorite);
        }

        if (searchQuery) {
            filtered = filtered.filter(chat =>
                chat.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        const pinned = filtered.filter(chat => chat.isPinned);
        const unpinned = filtered.filter(chat => !chat.isPinned);

        return { pinned, unpinned };
    };

    const { pinned, unpinned } = filterChats();

    if (pinned.length === 0 && unpinned.length === 0) {
        return (
            <div className="chat-list-empty">
                No chats found
            </div>
        );
    };

    const SectionHeader = ({
                               title,
                               collapsed,
                               onToggle
                           }: {
        title: string;
        collapsed: boolean;
        onToggle: () => void;
    }) => (
        <div className="section-header" onClick={onToggle}>
            <span className="section-title">{title}</span>
            <img
                src={collapseIcon}
                alt="collapse"
                className={`collapse-icon ${collapsed ? 'collapsed' : ''}`}
            />
        </div>
    );

    return (
        <div className="chat-list">
            {pinned.length > 0 && (
                <div className="chat-section">
                    <SectionHeader
                        title="Pinned Chats"
                        collapsed={pinnedCollapsed}
                        onToggle={() => setPinnedCollapsed(!pinnedCollapsed)}
                    />
                    {!pinnedCollapsed && (
                        <div className="section-content">
                            {pinned.map((chat) => (
                                <ChatItem
                                    key={chat.id}
                                    chat={chat}
                                    isSelected={chat.id === selectedChatId}
                                    onClick={() => onChatSelect(chat)}
                                    onTogglePin={onTogglePin}
                                    onToggleFavorite={onToggleFavorite}
                                    onToggleMute={onToggleMute}
                                    isMuted={mutedChats.has(chat.id)}
                                    isFavorite={chat.isFavorite}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {unpinned.length > 0 && (
                <div className="chat-section">
                    <SectionHeader
                        title={
                            activeTab === 'Groups' ? 'Group Chats' :
                                activeTab === 'Friends' ? 'Friend Chats' :
                                    'All Chats'
                        }
                        collapsed={unpinnedCollapsed}
                        onToggle={() => setUnpinnedCollapsed(!unpinnedCollapsed)}
                    />
                    {!unpinnedCollapsed && (
                        <div className="section-content">
                            {unpinned.map((chat) => (
                                <ChatItem
                                    key={chat.id}
                                    chat={chat}
                                    isSelected={chat.id === selectedChatId}
                                    onClick={() => onChatSelect(chat)}
                                    onTogglePin={onTogglePin}
                                    onToggleFavorite={onToggleFavorite}
                                    onToggleMute={onToggleMute}
                                    isMuted={mutedChats.has(chat.id)}
                                    isFavorite={chat.isFavorite}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}