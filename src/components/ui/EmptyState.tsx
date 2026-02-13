/**
 * EmptyState Component (T071-T072)
 * Designed empty state with illustration, guidance text, and optional CTA.
 *
 * Features:
 * - Variants: no-todos, no-results, all-complete
 * - Custom icons for each variant
 * - Helpful guidance text
 * - Optional CTA button
 * - Dark mode support
 */

import React from 'react';
import { Button } from './Button';

export type EmptyStateVariant = 'no-todos' | 'no-results' | 'all-complete' | 'error';

export interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  cta?: {
    text: string;
    action: () => void;
    variant?: 'primary' | 'secondary';
  };
  className?: string;
}

// Default content for each variant
const variantContent: Record<EmptyStateVariant, { title: string; description: string; icon: React.ReactNode }> = {
  'no-todos': {
    title: 'No tasks yet',
    description: 'Get started by creating your first task and take control of your day.',
    icon: (
      <svg
        className="w-12 h-12 stroke-slate-400"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
        />
      </svg>
    ),
  },
  'no-results': {
    title: 'No results found',
    description: 'Try adjusting your search or filter to find what you\'re looking for.',
    icon: (
      <svg
        className="w-12 h-12 stroke-slate-400"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    ),
  },
  'all-complete': {
    title: 'All done!',
    description: 'You\'ve completed all your tasks. Time to celebrate or add new ones!',
    icon: (
      <svg
        className="w-12 h-12 stroke-emerald-500"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
        />
      </svg>
    ),
  },
  'error': {
    title: 'Something went wrong',
    description: 'We encountered an error loading your data. Please try again.',
    icon: (
      <svg
        className="w-12 h-12 stroke-rose-500"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>
    ),
  },
};

export function EmptyState({
  variant = 'no-todos',
  title,
  description,
  cta,
  className = '',
}: EmptyStateProps) {
  const content = variantContent[variant];
  const displayTitle = title || content.title;
  const displayDescription = description || content.description;

  return (
    <div
      className={`
        flex flex-col items-center justify-center py-16 px-4 text-center
        animate-fadeInUp
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      role="status"
      aria-live="polite"
    >
      {/* Icon container */}
      <div
        className={`
          w-24 h-24 rounded-full
          flex items-center justify-center mb-6
          ${variant === 'all-complete'
            ? 'bg-emerald-100 dark:bg-emerald-950/30'
            : variant === 'error'
              ? 'bg-rose-100 dark:bg-rose-950/30'
              : 'bg-slate-100 dark:bg-slate-700'
          }
        `}
      >
        {content.icon}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
        {displayTitle}
      </h3>

      {/* Description */}
      <p className="text-slate-600 dark:text-slate-400 max-w-md mb-8">
        {displayDescription}
      </p>

      {/* CTA Button */}
      {cta && (
        <Button
          variant={cta.variant || 'primary'}
          size="lg"
          onClick={cta.action}
        >
          {cta.text}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
