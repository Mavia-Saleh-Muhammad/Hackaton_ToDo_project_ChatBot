/**
 * Card Component
 * Flagship UI card with rounded corners, shadows, and hover effects.
 *
 * Features:
 * - Dark mode support
 * - Rounded-2xl borders per design-system.md
 * - 4-layer shadow system (resting, raised)
 * - Micro-lift hover animation
 */

import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className = '',
  padding = 'md',
  hover = false,
  onClick,
}: CardProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverStyles = hover
    ? `
      hover:shadow-raised hover:-translate-y-0.5
      transition-all duration-200 ease-out
      cursor-pointer
    `
    : '';

  const clickableStyles = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`
        bg-white dark:bg-slate-800
        rounded-2xl
        border border-slate-100 dark:border-slate-700
        shadow-resting
        ${paddingStyles[padding]}
        ${hoverStyles}
        ${clickableStyles}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}

// Sub-components for Card
export const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div
    className={`
      px-6 py-5
      border-b border-slate-100 dark:border-slate-700
      ${className}
    `.replace(/\s+/g, ' ').trim()}
  >
    {children}
  </div>
);

export const CardTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <h3
    className={`
      text-lg font-semibold
      text-slate-900 dark:text-slate-50
      ${className}
    `.replace(/\s+/g, ' ').trim()}
  >
    {children}
  </h3>
);

export const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`.trim()}>{children}</div>
);

export default Card;
