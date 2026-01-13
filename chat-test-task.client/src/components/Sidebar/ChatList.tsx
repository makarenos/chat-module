import type { Chat, TabType } from '../../types';
import ChatItem from './ChatItem';
import './ChatList.css';

interface ChatListProps {
    chats: Chat[];
    activeTab: TabType;
    searchQuery: string;
    selectedChatId: number | null;
    onChatSelect: (chat: Chat) => void;
}

export default function ChatList({
                                     chats,
                                     activeTab,
                                     searchQuery,
                                     selectedChatId,
                                     onChatSelect
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

        return [...pinned, ...unpinned];
    };

    const filteredChats = filterChats();

    if (filteredChats.length === 0) {
        return (
            <div className="chat-list-empty">
                No chats found
            </div>
        );
    }

    return (
        <div className="chat-list">
            {filteredChats.map((chat) => (
                <ChatItem
                    key={chat.id}
                    chat={chat}
                    isSelected={chat.id === selectedChatId}
                    onClick={() => onChatSelect(chat)}
                />
            ))}
        </div>
    );
}