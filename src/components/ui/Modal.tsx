'use client';

/**
 * Modal Component (T024-T027)
 * Flagship UI modal with backdrop, glassmorphism, and entrance animations.
 *
 * Features:
 * - Backdrop: bg-slate-900/50 backdrop-blur-md (T025)
 * - Content: rounded-2xl, shadow-xl/2xl, glassmorphism (T026)
 * - Entrance animation: scale 0.95->1, opacity 0->1, 300ms ease-out-cubic (T027)
 */

import React, { useEffect, useCallback, useState } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}: ModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Handle open/close animations
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to trigger entrance animation
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      // Wait for exit animation to complete before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close modal on Escape key
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  if (!shouldRender) return null;

  const sizeStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby={title ? 'modal-title' : undefined}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop (T025) */}
      <div
        className={`
          fixed inset-0
          bg-slate-900/50 backdrop-blur-md
          transition-opacity duration-200 ease-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content Container */}
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        {/* Modal Panel (T026, T027) */}
        <div
          className={`
            relative w-full ${sizeStyles[size]}
            bg-white dark:bg-slate-800
            border border-slate-100 dark:border-slate-700
            rounded-2xl
            shadow-xl dark:shadow-2xl
            p-6 sm:p-8
            transform
            transition-all duration-300 ease-out
            ${
              isAnimating
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-95 translate-y-2'
            }
          `.replace(/\s+/g, ' ').trim()}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {title && (
            <div className="mb-6 flex items-center justify-between">
              <h3
                id="modal-title"
                className="text-xl font-semibold text-slate-900 dark:text-slate-50"
              >
                {title}
              </h3>
              <button
                onClick={onClose}
                className="
                  p-2 -mr-2
                  text-slate-400 hover:text-slate-600
                  dark:text-slate-500 dark:hover:text-slate-300
                  rounded-lg
                  hover:bg-slate-100 dark:hover:bg-slate-700
                  transition-colors duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                "
                aria-label="Close modal"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Body */}
          <div className={title ? '' : 'pt-0'}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
