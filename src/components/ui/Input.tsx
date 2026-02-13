/**
 * Input Component (T020-T023)
 * Flagship UI input with focus glow, inner shadow, and error states.
 *
 * Features:
 * - Focus glow: ring-2 ring-indigo-500/20 (T021)
 * - Inner shadow for depth perception (T022)
 * - Error state: rose-500 border and ring (T023)
 * - Dark mode support
 */

import React, { useId } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    const generatedId = useId();
    const inputId = props.id || `input-${generatedId}`;

    // Base input styles with inner shadow (T022)
    const baseInputStyles = `
      block w-full px-4 py-2.5
      bg-white dark:bg-slate-800
      border rounded-xl
      text-slate-900 dark:text-slate-100
      placeholder-slate-400 dark:placeholder-slate-500
      input-inner-shadow
      transition-all duration-200 ease-out
      disabled:bg-slate-100 dark:disabled:bg-slate-900
      disabled:cursor-not-allowed disabled:opacity-60
    `;

    // Focus styles with glow effect (T021)
    const focusStyles = `
      focus:outline-none
      focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
      dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20
    `;

    // Error styles (T023)
    const errorStyles = error
      ? `
        border-rose-500 ring-2 ring-rose-500/20
        focus:border-rose-500 focus:ring-rose-500/20
        dark:border-rose-400 dark:ring-rose-400/20
      `
      : `border-slate-200 dark:border-slate-700`;

    return (
      <div className="w-full">
        {/* Label (T020) */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
          >
            {label}
            {props.required && (
              <span className="text-rose-500 ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* Input field */}
        <input
          ref={ref}
          id={inputId}
          className={`
            ${baseInputStyles}
            ${focusStyles}
            ${errorStyles}
            ${className}
          `.replace(/\s+/g, ' ').trim()}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          {...props}
        />

        {/* Error message (T023) */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-2 text-sm text-rose-600 dark:text-rose-400 flex items-center"
            role="alert"
          >
            <svg
              className="w-4 h-4 mr-1.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="mt-2 text-sm text-slate-500 dark:text-slate-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
