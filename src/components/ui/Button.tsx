/**
 * Button Component (T015-T019)
 * Flagship UI button with variants, sizes, and micro-interactions.
 *
 * Features:
 * - Variants: primary, secondary, ghost, danger (per design-system.md)
 * - Sizes: sm, md, lg with appropriate padding and border radius
 * - Loading state with spinner and disabled opacity
 * - Hover/active animations with micro-lift effect (200-300ms)
 */

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  // Base styles with transitions for micro-lift animation (T019)
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium
    transition-all duration-200 ease-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
  `;

  // Variant styles per design-system.md (T016)
  const variantStyles = {
    // Primary: indigo background with hover micro-lift
    primary: `
      bg-indigo-600 text-white
      shadow-md
      hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5
      active:bg-indigo-800 active:shadow-sm active:translate-y-0
      focus-visible:ring-indigo-500
      dark:bg-indigo-500 dark:hover:bg-indigo-600
    `,
    // Secondary: white background with border
    secondary: `
      bg-white text-slate-900 border border-slate-200
      hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5 hover:shadow-sm
      active:bg-slate-100 active:translate-y-0
      focus-visible:ring-slate-500
      dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700
      dark:hover:bg-slate-700 dark:hover:border-slate-600
    `,
    // Ghost: transparent with hover background
    ghost: `
      bg-transparent text-slate-700
      hover:bg-slate-100 hover:text-slate-900
      active:bg-slate-200
      focus-visible:ring-slate-500
      dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100
    `,
    // Danger: red background for destructive actions
    danger: `
      bg-rose-600 text-white
      shadow-md
      hover:bg-rose-700 hover:shadow-lg hover:-translate-y-0.5
      active:bg-rose-800 active:shadow-sm active:translate-y-0
      focus-visible:ring-rose-500
      dark:bg-rose-500 dark:hover:bg-rose-600
    `,
  };

  // Size styles per design-system.md (T017)
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
    md: 'px-4 py-2 text-base rounded-xl gap-2',
    lg: 'px-6 py-3 text-lg rounded-2xl gap-2.5',
  };

  // Loading spinner size
  const spinnerSize = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${isLoading ? 'opacity-70' : ''}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      disabled={isDisabled}
      aria-busy={isLoading}
      {...props}
    >
      {/* Loading state (T018) */}
      {isLoading ? (
        <>
          <svg
            className={`animate-spin ${spinnerSize[size]}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
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
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
