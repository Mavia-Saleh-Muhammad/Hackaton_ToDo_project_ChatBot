'use client';

/**
 * ThemeToggle Component (T033-T036)
 * Sun/moon icon toggle for switching between light and dark themes.
 *
 * Features:
 * - Sun icon in dark mode, moon icon in light mode
 * - Hover animation with micro-lift effect
 * - Smooth icon transition
 */

import React from 'react';
import { useTheme } from '../providers/ThemeProvider';

export interface ThemeToggleProps {
  position?: 'header' | 'settings';
  showLabel?: boolean;
}

export function ThemeToggle({
  position = 'header',
  showLabel = false,
}: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`
        inline-flex items-center justify-center
        p-2
        bg-white dark:bg-slate-800
        border border-slate-200 dark:border-slate-700
        rounded-xl
        shadow-sm
        hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600
        hover:-translate-y-0.5
        transition-all duration-200 ease-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400
        ${position === 'settings' ? 'w-full justify-start gap-3' : ''}
      `.replace(/\s+/g, ' ').trim()}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Sun icon (shown in dark mode) */}
      <svg
        className={`
          w-5 h-5
          transition-all duration-300 ease-out
          ${isDark ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90 absolute'}
          stroke-amber-500
        `}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Moon icon (shown in light mode) */}
      <svg
        className={`
          w-5 h-5
          transition-all duration-300 ease-out
          ${!isDark ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90 absolute'}
          stroke-slate-700
        `}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>

      {/* Label (optional) */}
      {showLabel && (
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {isDark ? 'Light mode' : 'Dark mode'}
        </span>
      )}
    </button>
  );
}

export default ThemeToggle;
