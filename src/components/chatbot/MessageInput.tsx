'use client';

/**
 * MessageInput Component (T063)
 * Chat input field with send button.
 *
 * Features:
 * - Rounded corners, focus ring
 * - Paper plane send icon
 * - Disabled when empty or loading
 * - Dark mode support
 */

import React, { useState, useRef, useEffect } from 'react';

interface MessageInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function MessageInput({ onSend, isLoading, disabled = false }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const canSend = message.trim().length > 0 && !isLoading && !disabled;

  const handleSend = () => {
    if (!canSend) return;
    onSend(message);
    setMessage('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [message]);

  return (
    <div
      className="
        flex items-end gap-2
        p-4
        border-t border-slate-200 dark:border-slate-700
        bg-white dark:bg-slate-800
      "
    >
      {/* Text input */}
      <textarea
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        disabled={isLoading || disabled}
        rows={1}
        className="
          flex-1
          px-4 py-2.5
          bg-slate-50 dark:bg-slate-700
          border border-slate-200 dark:border-slate-600
          rounded-xl
          text-sm text-slate-900 dark:text-slate-100
          placeholder-slate-400 dark:placeholder-slate-500
          resize-none
          focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-200
        "
        aria-label="Chat message input"
      />

      {/* Send button */}
      <button
        onClick={handleSend}
        disabled={!canSend}
        className={`
          p-2.5
          rounded-xl
          transition-all duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
          ${canSend
            ? `
              bg-indigo-600 hover:bg-indigo-700
              text-white
              shadow-sm hover:shadow-md
            `
            : `
              bg-slate-100 dark:bg-slate-700
              text-slate-400 dark:text-slate-500
              cursor-not-allowed
            `
          }
        `}
        aria-label="Send message"
      >
        {isLoading ? (
          // Loading spinner
          <svg
            className="w-5 h-5 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          // Paper plane icon
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

export default MessageInput;
