/**
 * Chat API client for AI chatbot (T067)
 */

import type { ChatRequest, ChatResponse, ChatMessage, Conversation } from '../components/chatbot/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Get auth token from localStorage
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

/**
 * Make authenticated API request
 */
async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getAuthToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
}

/**
 * Send a chat message
 */
export async function sendChatMessage(
  message: string,
  conversationId?: string,
): Promise<ChatResponse> {
  const request: ChatRequest = {
    message,
    conversation_id: conversationId,
  };

  const response = await authFetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Chat request failed' }));
    throw new Error(error.detail || 'Failed to send message');
  }

  return response.json();
}

/**
 * Get conversation messages
 */
export async function getConversationMessages(
  conversationId: string,
): Promise<ChatMessage[]> {
  const response = await authFetch(
    `${API_BASE}/api/chat/conversations/${conversationId}/messages`,
  );

  if (!response.ok) {
    throw new Error('Failed to load conversation');
  }

  const data = await response.json();

  return data.messages.map((m: any) => ({
    id: m.id,
    conversationId: m.conversation_id,
    role: m.role,
    content: m.content,
    timestamp: new Date(m.created_at),
  }));
}

/**
 * Get user's conversations
 */
export async function getConversations(
  limit = 50,
  offset = 0,
): Promise<Conversation[]> {
  const response = await authFetch(
    `${API_BASE}/api/chat/conversations?limit=${limit}&offset=${offset}`,
  );

  if (!response.ok) {
    throw new Error('Failed to load conversations');
  }

  const data = await response.json();

  return data.conversations.map((c: any) => ({
    id: c.id,
    userId: c.user_id,
    title: c.title,
    createdAt: new Date(c.created_at),
    updatedAt: new Date(c.updated_at),
  }));
}
