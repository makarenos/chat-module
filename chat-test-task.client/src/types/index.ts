export interface User {
    id: number;
    username: string;
    avatarUrl: string;
}

export interface Chat {
    id: number;
    name: string;
    type: 'Group' | 'Friend';
    isPinned: boolean;
    isFavorite: boolean;
    updatedAt: string;
    lastMessage: string;
    users: User[];
}

export interface Message {
    id: number;
    chatId: number;
    userId: number | null;
    text: string;
    timestamp: string;
    isSystemMessage: boolean;
}

export interface SendMessageDto {
    chatId: number;
    text: string;
}

export type TabType = 'All' | 'Groups' | 'Friends' | 'Favorites';