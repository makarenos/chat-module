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
    const [groupChatsCollapsed, setGroupChatsCollapsed] = useState(false);
    const [friendChatsCollapsed, setFriendChatsCollapsed] = useState(false);
    const [allChatsCollapsed, setAllChatsCollapsed] = useState(false);

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

        const groupChats = unpinned.filter(chat => chat.type === 'Group');
        const friendChats = unpinned.filter(chat => chat.type === 'Friend');

        return { pinned, groupChats, friendChats, unpinned };
    };

    const { pinned, groupChats, friendChats, unpinned } = filterChats();

    if (pinned.length === 0 && unpinned.length === 0) {
        return (
            <div className="chat-list-empty">
                No chats found
            </div>
        );
    }

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

    const renderChatItems = (chatList: Chat[]) => (
        chatList.map((chat) => (
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
                unreadCount={chat.unreadCount}
            />
        ))
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
                            {renderChatItems(pinned)}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'All' && (
                <>
                    {groupChats.length > 0 && (
                        <div className="chat-section">
                            <SectionHeader
                                title="Group Chats"
                                collapsed={groupChatsCollapsed}
                                onToggle={() => setGroupChatsCollapsed(!groupChatsCollapsed)}
                            />
                            {!groupChatsCollapsed && (
                                <div className="section-content">
                                    {renderChatItems(groupChats)}
                                </div>
                            )}
                        </div>
                    )}

                    {friendChats.length > 0 && (
                        <div className="chat-section">
                            <SectionHeader
                                title="Friend Chats"
                                collapsed={friendChatsCollapsed}
                                onToggle={() => setFriendChatsCollapsed(!friendChatsCollapsed)}
                            />
                            {!friendChatsCollapsed && (
                                <div className="section-content">
                                    {renderChatItems(friendChats)}
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}

            {activeTab === 'Groups' && groupChats.length > 0 && (
                <div className="chat-section">
                    <SectionHeader
                        title="Group Chats"
                        collapsed={groupChatsCollapsed}
                        onToggle={() => setGroupChatsCollapsed(!groupChatsCollapsed)}
                    />
                    {!groupChatsCollapsed && (
                        <div className="section-content">
                            {renderChatItems(groupChats)}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'Friends' && friendChats.length > 0 && (
                <div className="chat-section">
                    <SectionHeader
                        title="Friend Chats"
                        collapsed={friendChatsCollapsed}
                        onToggle={() => setFriendChatsCollapsed(!friendChatsCollapsed)}
                    />
                    {!friendChatsCollapsed && (
                        <div className="section-content">
                            {renderChatItems(friendChats)}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'Favorites' && unpinned.length > 0 && (
                <div className="chat-section">
                    <SectionHeader
                        title="All Chats"
                        collapsed={allChatsCollapsed}
                        onToggle={() => setAllChatsCollapsed(!allChatsCollapsed)}
                    />
                    {!allChatsCollapsed && (
                        <div className="section-content">
                            {renderChatItems(unpinned)}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}