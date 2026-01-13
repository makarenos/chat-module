import type { Chat, Message, SendMessageDto } from '../types';

const API_BASE = '/api';

export async function getChats(): Promise<Chat[]> {
    const response = await fetch(`${API_BASE}/chats`);
    if (!response.ok) throw new Error('Failed to fetch chats');
    return response.json();
}

export async function getMessages(chatId: number): Promise<Message[]> {
    const response = await fetch(`${API_BASE}/messages/${chatId}`);
    if (!response.ok) throw new Error('Failed to fetch messages');
    return response.json();
}

export async function sendMessage(dto: SendMessageDto): Promise<Message> {
    const response = await fetch(`${API_BASE}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dto),
    });
    if (!response.ok) throw new Error('Failed to send message');
    return response.json();
}

export const api = {
    getChats,
    getMessages,
    sendMessage,
};