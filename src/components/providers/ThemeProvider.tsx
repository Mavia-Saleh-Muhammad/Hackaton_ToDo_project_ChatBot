'use client';

/**
 * ThemeProvider Component (T011-T013)
 * Provides theme context with detection, persistence, and smooth transitions.
 *
 * Features:
 * - Theme detection: localStorage -> system preference -> fallback to 'light'
 * - Persistence: saves preference to localStorage on change
 * - Transition: toggles 'dark' class on html element with smooth animation
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Theme, UseThemeReturn } from '../../lib/theme';
import {
  getStoredTheme,
  getSystemTheme,
  storeTheme,
  resolveTheme,
  applyTheme,
} from '../../lib/theme';

interface ThemeContextValue extends UseThemeReturn {}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount (T011: detection from localStorage -> system -> fallback)
  useEffect(() => {
    const storedTheme = getStoredTheme();
    const initialTheme = storedTheme || defaultTheme;
    const resolved = resolveTheme(initialTheme);

    setThemeState(initialTheme);
    setResolvedTheme(resolved);
    applyTheme(resolved);
    setMounted(true);
  }, [defaultTheme]);

  // Listen for system theme changes when using 'system' preference
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const newResolved = e.matches ? 'dark' : 'light';
      setResolvedTheme(newResolved);
      applyTheme(newResolved);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // T012: Persist theme to localStorage and apply it (T013: toggle class on html)
  const setTheme = useCallback((newTheme: Theme) => {
    // Add transitioning class for smooth animation
    document.documentElement.classList.add('transitioning');

    const resolved = resolveTheme(newTheme);

    setThemeState(newTheme);
    setResolvedTheme(resolved);
    storeTheme(newTheme);
    applyTheme(resolved);

    // Remove transitioning class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('transitioning');
    }, 500);
  }, []);

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }, [resolvedTheme, setTheme]);

  const contextValue: ThemeContextValue = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };

  // Prevent flash of wrong theme on initial render
  // but still provide context so useTheme() doesn't fail
  if (!mounted) {
    return (
      <ThemeContext.Provider value={contextValue}>
        <div style={{ visibility: 'hidden' }}>
          {children}
        </div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 */
export function useTheme(): UseThemeReturn {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

export default ThemeProvider;
