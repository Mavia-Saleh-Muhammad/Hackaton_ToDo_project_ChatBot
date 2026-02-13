'use client';

/**
 * ChatPanel Component (T061, T069, T071)
 * Slide-in glassmorphic chat panel.
 *
 * Features:
 * - Fixed right position, 400px width (100% on mobile)
 * - Glassmorphic design with backdrop blur
 * - Slide-in animation from right
 * - Auto-scroll to bottom on new messages
 * - Dark mode support
 */

import React, { useEffect, useRef, useState } from 'react';
import { useChatContext } from './ChatProvider';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { TypingIndicator } from './TypingIndicator';

export function ChatPanel() {
  const { state, sendMessage, closeChat, clearConversation } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (state.isOpen) {
      scrollToBottom();
    }
  }, [state.messages, state.isLoading, state.isOpen]);

  // Detect if user has scrolled up
  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 100;
    setShowScrollButton(!isNearBottom);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!state.isOpen) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className="
          fixed inset-0 z-40
          bg-black/20 backdrop-blur-sm
          md:hidden
          transition-opacity duration-300
        "
        onClick={closeChat}
        aria-hidden="true"
      />

      {/* Chat panel */}
      <div
        className={`
          fixed z-50
          bottom-0 right-0
          w-full md:w-[400px]
          h-[85vh] md:h-[600px] md:max-h-[80vh]
          md:bottom-24 md:right-6
          flex flex-col
          bg-white/80 dark:bg-slate-800/80
          backdrop-blur-xl
          border border-slate-200 dark:border-slate-700
          rounded-t-3xl md:rounded-2xl
          shadow-2xl
          overflow-hidden
          animate-slide-in-right
        `}
        role="dialog"
        aria-label="AI Chat"
        aria-modal="true"
      >
        {/* Header */}
        <div
          className="
            flex items-center justify-between
            px-5 py-4
            border-b border-slate-200 dark:border-slate-700
            bg-white/50 dark:bg-slate-800/50
            backdrop-blur-sm
          "
        >
          <div className="flex items-center gap-3">
            {/* AI Avatar */}
            <div
              className="
                w-10 h-10
                rounded-full
                bg-gradient-to-br from-emerald-400 to-emerald-600
                flex items-center justify-center
                shadow-sm
              "
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                AI Assistant
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Task management helper
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* New chat button */}
            <button
              onClick={clearConversation}
              className="
                p-2 rounded-lg
                text-slate-400 hover:text-slate-600
                dark:text-slate-500 dark:hover:text-slate-300
                hover:bg-slate-100 dark:hover:bg-slate-700
                transition-colors duration-200
              "
              aria-label="New conversation"
              title="New conversation"
            >
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>

            {/* Close button (visible on desktop) */}
            <button
              onClick={closeChat}
              className="
                hidden md:flex
                p-2 rounded-lg
                text-slate-400 hover:text-slate-600
                dark:text-slate-500 dark:hover:text-slate-300
                hover:bg-slate-100 dark:hover:bg-slate-700
                transition-colors duration-200
              "
              aria-label="Close chat"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages container */}
        <div
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className="
            flex-1 overflow-y-auto
            px-4 py-4
            space-y-3
          "
        >
          {/* Empty state */}
          {state.messages.length === 0 && !state.isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div
                className="
                  w-16 h-16 mb-4
                  rounded-full
                  bg-emerald-100 dark:bg-emerald-900/30
                  flex items-center justify-center
                "
              >
                <svg
                  className="w-8 h-8 text-emerald-600 dark:text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                How can I help?
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                I can help you manage your tasks using natural language.
              </p>
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <p>Try saying:</p>
                <ul className="space-y-1">
                  <li>&quot;Add buy groceries&quot;</li>
                  <li>&quot;List my tasks&quot;</li>
                  <li>&quot;Who am I?&quot;</li>
                </ul>
              </div>
            </div>
          )}

          {/* Messages */}
          {state.messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {/* Typing indicator */}
          {state.isLoading && <TypingIndicator />}

          {/* Error message */}
          {state.error && (
            <div
              className="
                mx-auto max-w-[80%]
                p-3 rounded-xl
                bg-rose-50 dark:bg-rose-900/20
                border border-rose-200 dark:border-rose-800
                text-sm text-rose-700 dark:text-rose-300
              "
            >
              {state.error}
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Scroll to bottom button */}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="
              absolute bottom-24 left-1/2 -translate-x-1/2
              p-2 rounded-full
              bg-white dark:bg-slate-700
              border border-slate-200 dark:border-slate-600
              shadow-md
              text-slate-500 dark:text-slate-400
              hover:bg-slate-50 dark:hover:bg-slate-600
              transition-all duration-200
            "
            aria-label="Scroll to latest message"
          >
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
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        )}

        {/* Input area */}
        <MessageInput
          onSend={sendMessage}
          isLoading={state.isLoading}
        />
      </div>
    </>
  );
}

export default ChatPanel;
