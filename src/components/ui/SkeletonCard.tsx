/**
 * SkeletonCard Component (T048, T070)
 * Loading skeleton with shimmer animation for content loading states.
 *
 * Features:
 * - Shimmer animation (1.5s infinite)
 * - Multiple skeleton element sizes
 * - Staggered animation delays
 * - Dark mode support
 */

import React from 'react';

export interface SkeletonCardProps {
  variant?: 'card' | 'list-item' | 'inline';
  lines?: number;
  showAvatar?: boolean;
  className?: string;
}

/**
 * Single skeleton line/element
 */
export function SkeletonElement({
  className = '',
  width = 'w-full',
  height = 'h-4',
  delay = 0,
}: {
  className?: string;
  width?: string;
  height?: string;
  delay?: number;
}) {
  return (
    <div
      className={`
        shimmer rounded-lg
        ${width} ${height}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      style={{ animationDelay: `${delay}ms` }}
      aria-hidden="true"
    />
  );
}

/**
 * Skeleton card for task items
 */
export function SkeletonCard({
  variant = 'card',
  lines = 2,
  showAvatar = false,
  className = '',
}: SkeletonCardProps) {
  if (variant === 'list-item') {
    return (
      <div
        className={`
          flex items-start gap-4 p-6
          bg-white dark:bg-slate-800
          rounded-2xl border border-slate-100 dark:border-slate-700
          ${className}
        `.replace(/\s+/g, ' ').trim()}
        role="status"
        aria-label="Loading..."
      >
        {/* Checkbox skeleton */}
        <SkeletonElement width="w-6" height="h-6" className="flex-shrink-0 rounded-lg" />

        <div className="flex-1 space-y-3">
          {/* Title */}
          <SkeletonElement width="w-3/4" height="h-5" delay={50} />

          {/* Description lines */}
          {Array.from({ length: lines }).map((_, i) => (
            <SkeletonElement
              key={i}
              width={i === lines - 1 ? 'w-1/2' : 'w-full'}
              height="h-4"
              delay={100 + i * 50}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div
        className={`inline-flex items-center gap-2 ${className}`}
        role="status"
        aria-label="Loading..."
      >
        <SkeletonElement width="w-4" height="h-4" className="rounded-full" />
        <SkeletonElement width="w-24" height="h-4" delay={50} />
      </div>
    );
  }

  // Default card variant
  return (
    <div
      className={`
        bg-white dark:bg-slate-800
        rounded-2xl border border-slate-100 dark:border-slate-700
        p-6
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      role="status"
      aria-label="Loading..."
    >
      <div className="flex items-start gap-4">
        {showAvatar && (
          <SkeletonElement width="w-12" height="h-12" className="rounded-full flex-shrink-0" />
        )}

        <div className="flex-1 space-y-4">
          {/* Title */}
          <SkeletonElement width="w-3/4" height="h-6" />

          {/* Content lines */}
          {Array.from({ length: lines }).map((_, i) => (
            <SkeletonElement
              key={i}
              width={i === lines - 1 ? 'w-2/3' : 'w-full'}
              height="h-4"
              delay={(i + 1) * 100}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Multiple skeleton cards for loading lists
 */
export function SkeletonList({
  count = 3,
  variant = 'list-item',
  className = '',
}: {
  count?: number;
  variant?: SkeletonCardProps['variant'];
  className?: string;
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard
          key={i}
          variant={variant}
          className={`stagger-${Math.min(i + 1, 6)}`}
        />
      ))}
    </div>
  );
}

export default SkeletonCard;
