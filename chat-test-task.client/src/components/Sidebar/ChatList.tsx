import type { Chat, TabType } from '../../types';
import ChatItem from './ChatItem';
import './ChatList.css';

interface ChatListProps {
    chats: Chat[];
    activeTab: TabType;
    searchQuery: string;
    selectedChatId: number | null;
    onChatSelect: (chat: Chat) => void;
    onTogglePin?: (chatId: number) => void;
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
                                     mutedChats,
                                     onToggleMute
                                 }: ChatListProps) {

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
    }

    return (
        <div className="chat-list">
            {pinned.length > 0 && (
                <div className="chat-section">
                    <div className="section-header">Pinned Chats</div>
                    {pinned.map((chat) => (
                        <ChatItem
                            key={chat.id}
                            chat={chat}
                            isSelected={chat.id === selectedChatId}
                            onClick={() => onChatSelect(chat)}
                            onTogglePin={onTogglePin}
                            isMuted={mutedChats.has(chat.id)}
                            onToggleMute={onToggleMute}
                        />
                    ))}
                </div>
            )}

            {unpinned.length > 0 && (
                <div className="chat-section">
                    {pinned.length > 0 && (
                        <div className="section-header">
                            {activeTab === 'Groups' ? 'Group Chats' :
                                activeTab === 'Friends' ? 'Friend Chats' :
                                    'All Chats'}
                        </div>
                    )}
                    {unpinned.map((chat) => (
                        <ChatItem
                            key={chat.id}
                            chat={chat}
                            isSelected={chat.id === selectedChatId}
                            onClick={() => onChatSelect(chat)}
                            onTogglePin={onTogglePin}
                            isMuted={mutedChats.has(chat.id)}
                            onToggleMute={onToggleMute}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}