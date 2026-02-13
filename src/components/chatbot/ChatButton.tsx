'use client';

/**
 * ChatButton Component (T060, T070)
 * Floating trigger button with pulse animation for the AI chatbot.
 *
 * Features:
 * - Fixed bottom-right position (16px margin)
 * - 56px diameter emerald circle
 * - Subtle pulse animation when idle
 * - Dark mode support
 */

import React from 'react';
import { useChatContext } from './ChatProvider';

export function ChatButton() {
  const { toggleChat, state } = useChatContext();

  return (
    <button
      onClick={toggleChat}
      className={`
        fixed bottom-6 right-6 z-50
        w-14 h-14
        bg-emerald-500 hover:bg-emerald-600
        dark:bg-emerald-600 dark:hover:bg-emerald-500
        rounded-full
        shadow-lg hover:shadow-xl
        transition-all duration-300 ease-out
        hover:-translate-y-1
        focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2
        ${state.isOpen ? 'scale-90' : 'animate-pulse-subtle'}
      `}
      aria-label={state.isOpen ? 'Close chat' : 'Open chat'}
      aria-expanded={state.isOpen}
    >
      {state.isOpen ? (
        // Close icon
        <svg
          className="w-6 h-6 mx-auto text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        // Chat bubble icon
        <svg
          className="w-6 h-6 mx-auto text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      )}
    </button>
  );
}

export default ChatButton;
