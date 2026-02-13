/**
 * Dashboard Layout (T060, T089)
 * Provides consistent layout structure with glassmorphism header.
 *
 * Features:
 * - Glassmorphic header (backdrop-blur-md, border-b)
 * - Dark mode support
 * - Responsive layout
 * - Page transition wrapper
 */

import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-bg-primary dark:bg-slate-900">
      {/* Subtle gradient overlay for visual depth */}
      <div
        className="
          fixed inset-0 -z-10
          bg-gradient-to-br from-slate-50 via-white to-slate-100
          dark:from-slate-900 dark:via-slate-900 dark:to-slate-800
        "
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Dashboard | Todo App',
  description: 'Manage your tasks and stay productive',
};
