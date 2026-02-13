'use client';

/**
 * useChat Hook (T065)
 * Custom hook for managing chat state and interactions.
 */

import { useState, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { ChatState, ChatMessage, ChatContextValue } from './types';
import { sendChatMessage, getConversationMessages } from '../../lib/chat-api';

const initialState: ChatState = {
  isOpen: false,
  messages: [],
  isLoading: false,
  conversationId: null,
  error: null,
};

export function useChat(): ChatContextValue {
  const [state, setState] = useState<ChatState>(initialState);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const openChat = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: true }));
  }, []);

  const closeChat = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const toggleChat = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  const clearConversation = useCallback(() => {
    setState((prev) => ({
      ...prev,
      messages: [],
      conversationId: null,
      error: null,
    }));
  }, []);

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;

    // Add user message optimistically
    const userMessage: ChatMessage = {
      id: uuidv4(),
      conversationId: state.conversationId || '',
      role: 'user',
      content: message.trim(),
      timestamp: new Date(),
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const response = await sendChatMessage(
        message.trim(),
        state.conversationId || undefined,
      );

      // Add assistant response
      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        conversationId: response.conversation_id,
        role: 'assistant',
        content: response.response,
        timestamp: new Date(),
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        conversationId: response.conversation_id,
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to send message',
      }));
    }
  }, [state.conversationId]);

  const loadConversation = useCallback(async (conversationId: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const messages = await getConversationMessages(conversationId);

      setState((prev) => ({
        ...prev,
        messages,
        conversationId,
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load conversation',
      }));
    }
  }, []);

  return {
    state,
    sendMessage,
    openChat,
    closeChat,
    toggleChat,
    clearConversation,
    loadConversation,
  };
}

export default useChat;
