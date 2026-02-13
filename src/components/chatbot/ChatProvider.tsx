'use client';

/**
 * ChatProvider (T066)
 * Context provider for chat functionality across the application.
 */

import React, { createContext, useContext } from 'react';
import { useChat } from './useChat';
import type { ChatContextValue } from './types';

const ChatContext = createContext<ChatContextValue | null>(null);

interface ChatProviderProps {
  children: React.ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const chatValue = useChat();

  return (
    <ChatContext.Provider value={chatValue}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext(): ChatContextValue {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }

  return context;
}

export default ChatProvider;
