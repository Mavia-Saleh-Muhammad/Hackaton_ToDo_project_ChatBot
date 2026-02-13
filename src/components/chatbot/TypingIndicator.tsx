'use client';

/**
 * TypingIndicator Component (T064)
 * Three animated dots showing the assistant is processing.
 */

import React from 'react';

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 p-3 max-w-[80%]">
      <div
        className="
          flex items-center gap-1.5
          bg-slate-100 dark:bg-slate-700
          rounded-2xl rounded-bl-md
          px-4 py-3
        "
      >
        <span
          className="
            w-2 h-2 rounded-full
            bg-slate-400 dark:bg-slate-500
            animate-bounce
          "
          style={{ animationDelay: '0ms' }}
        />
        <span
          className="
            w-2 h-2 rounded-full
            bg-slate-400 dark:bg-slate-500
            animate-bounce
          "
          style={{ animationDelay: '150ms' }}
        />
        <span
          className="
            w-2 h-2 rounded-full
            bg-slate-400 dark:bg-slate-500
            animate-bounce
          "
          style={{ animationDelay: '300ms' }}
        />
      </div>
    </div>
  );
}

export default TypingIndicator;
