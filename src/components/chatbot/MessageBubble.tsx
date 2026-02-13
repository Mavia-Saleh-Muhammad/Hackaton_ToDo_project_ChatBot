'use client';

/**
 * MessageBubble Component (T062)
 * Styled message bubble for user and assistant messages.
 *
 * Features:
 * - User messages: right-aligned, indigo background
 * - Assistant messages: left-aligned, slate background
 * - Timestamps on hover
 * - Dark mode support
 */

import React from 'react';
import type { ChatMessage } from './types';

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  const formatTime = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  return (
    <div
      className={`
        flex flex-col gap-1
        ${isUser ? 'items-end' : 'items-start'}
        group
      `}
    >
      {/* Message bubble */}
      <div
        className={`
          max-w-[80%]
          px-4 py-2.5
          text-sm leading-relaxed
          ${isUser
            ? `
              bg-indigo-600 text-white
              rounded-2xl rounded-br-md
            `
            : `
              bg-slate-100 dark:bg-slate-700
              text-slate-900 dark:text-slate-100
              rounded-2xl rounded-bl-md
            `
          }
        `}
      >
        {/* Render message content with basic markdown support for assistant */}
        {isUser ? (
          message.content
        ) : (
          <MessageContent content={message.content} />
        )}
      </div>

      {/* Timestamp */}
      <span
        className="
          text-xs text-slate-400 dark:text-slate-500
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          px-1
        "
      >
        {formatTime(message.timestamp)}
      </span>
    </div>
  );
}

/**
 * Render message content with basic markdown-like formatting
 */
function MessageContent({ content }: { content: string }) {
  // Split by newlines and process each line
  const lines = content.split('\n');

  return (
    <div className="space-y-1">
      {lines.map((line, index) => {
        // Bold text: **text**
        let processed: React.ReactNode = line;

        // Simple bold processing
        if (line.includes('**')) {
          const parts = line.split(/\*\*(.*?)\*\*/g);
          processed = parts.map((part, i) =>
            i % 2 === 1 ? <strong key={i}>{part}</strong> : part
          );
        }

        // List items
        if (line.trim().startsWith('- ') || line.trim().match(/^\d+\./)) {
          return (
            <div key={index} className="pl-2">
              {processed}
            </div>
          );
        }

        // Code blocks (inline)
        if (typeof processed === 'string' && processed.includes('`')) {
          const parts = processed.split(/`(.*?)`/g);
          processed = parts.map((part, i) =>
            i % 2 === 1 ? (
              <code
                key={i}
                className="px-1 py-0.5 bg-slate-200 dark:bg-slate-600 rounded text-xs"
              >
                {part}
              </code>
            ) : (
              part
            )
          );
        }

        return (
          <p key={index}>
            {processed || '\u00A0'}
          </p>
        );
      })}
    </div>
  );
}

export default MessageBubble;
