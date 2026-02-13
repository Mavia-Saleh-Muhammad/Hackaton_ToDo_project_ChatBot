'use client';

/**
 * Toast Component (T073-T076)
 * Toast notifications with entrance/exit animations and variants.
 *
 * Features:
 * - Variants: success, error, info (T074)
 * - Entrance animation: translate-y-8 to 0, opacity 0 to 1 (T075)
 * - Exit animation: opacity 1 to 0 (T076)
 * - Dark mode support
 * - Auto-dismiss with progress indicator
 */

import React, { useEffect, useState, useCallback } from 'react';
import type { Toast as ToastType, ToastType as ToastVariant } from '../../lib/toast';
import { ToastContext, useToastState } from '../../lib/toast';

export interface ToastProps extends ToastType {
  onDismiss: () => void;
}

/**
 * Individual Toast component
 */
export function Toast({ id, type, message, duration = 5000, onDismiss }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Trigger entrance animation
  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  // Handle dismiss with exit animation
  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(onDismiss, 200);
  }, [onDismiss]);

  // Variant-specific styles
  const variantStyles: Record<ToastVariant, { bg: string; border: string; icon: string; text: string }> = {
    success: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/20',
      border: 'border-emerald-200 dark:border-emerald-800',
      icon: 'text-emerald-600 dark:text-emerald-400',
      text: 'text-emerald-900 dark:text-emerald-100',
    },
    error: {
      bg: 'bg-rose-50 dark:bg-rose-950/20',
      border: 'border-rose-200 dark:border-rose-800',
      icon: 'text-rose-600 dark:text-rose-400',
      text: 'text-rose-900 dark:text-rose-100',
    },
    info: {
      bg: 'bg-slate-50 dark:bg-slate-800',
      border: 'border-slate-200 dark:border-slate-700',
      icon: 'text-slate-500 dark:text-slate-400',
      text: 'text-slate-900 dark:text-slate-100',
    },
  };

  const styles = variantStyles[type];

  // Icons for each variant
  const icons: Record<ToastVariant, React.ReactNode> = {
    success: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>
    ),
  };

  return (
    <div
      className={`
        flex items-center gap-3
        w-full max-w-sm
        ${styles.bg} ${styles.border}
        border rounded-xl p-4
        shadow-lg backdrop-blur-sm
        transition-all duration-300 ease-out
        ${isVisible && !isExiting
          ? 'translate-y-0 opacity-100'
          : 'translate-y-2 opacity-0'
        }
      `.replace(/\s+/g, ' ').trim()}
      role="alert"
      aria-live="polite"
    >
      {/* Icon */}
      <div className={`flex-shrink-0 ${styles.icon}`}>{icons[type]}</div>

      {/* Message */}
      <p className={`flex-1 text-sm font-medium ${styles.text}`}>{message}</p>

      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
        className={`
          flex-shrink-0 p-1 rounded-lg
          text-slate-400 hover:text-slate-600
          dark:text-slate-500 dark:hover:text-slate-300
          hover:bg-slate-100 dark:hover:bg-slate-700
          transition-colors duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
        `}
        aria-label="Dismiss notification"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

/**
 * Toast container that renders all active toasts
 */
export function ToastContainer({ toasts, removeToast }: { toasts: ToastType[]; removeToast: (id: string) => void }) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-3 items-center pointer-events-none"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast {...toast} onDismiss={() => removeToast(toast.id)} />
        </div>
      ))}
    </div>
  );
}

/**
 * Toast Provider component
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const toastState = useToastState();

  return (
    <ToastContext.Provider value={toastState}>
      {children}
      <ToastContainer toasts={toastState.toasts} removeToast={toastState.removeToast} />
    </ToastContext.Provider>
  );
}

export default Toast;
