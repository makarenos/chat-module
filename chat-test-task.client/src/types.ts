export type TabType = 'All' | 'Groups' | 'Friends' | 'Favorites';

export type User = {
    id: number;
    username: string;
    avatarUrl?: string;
};

export type Chat = {
    id: number;
    name: string;
    type: 'Group' | 'Friend';
    isPinned: boolean;
    isFavorite: boolean;
    updatedAt: string;
    lastMessage?: string;
    users: User[];
};

export type Message = {
    id: number;
    chatId: number;
    userId?: number;
    text: string;
    timestamp: string;
    isSystemMessage: boolean;
    user?: User;
};

export type SendMessageDto = {
    chatId: number;
    text: string;
};