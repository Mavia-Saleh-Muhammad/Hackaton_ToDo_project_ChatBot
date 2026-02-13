/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Mobile-first breakpoints
      screens: {
        'xs': '375px',   // Mobile
        'sm': '640px',   // Small tablets
        'md': '768px',   // Tablets
        'lg': '1024px',  // Laptops
        'xl': '1280px',  // Desktops
        '2xl': '1440px', // Large screens
      },
      // Design tokens - Colors (from design-system.md)
      colors: {
        // Primary palette
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        // Backgrounds
        bg: {
          primary: 'var(--bg-primary)',
          surface: 'var(--bg-surface)',
          'surface-2': 'var(--bg-surface-2)',
        },
        // Text
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
        },
        // Semantic colors
        success: {
          DEFAULT: 'var(--success)',
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        error: {
          DEFAULT: 'var(--error)',
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        accent: {
          DEFAULT: 'var(--accent)',
        },
        // Slate scale for UI
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Indigo scale (for primary actions)
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        // Rose scale (for errors/danger)
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        // Emerald scale (for success)
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
      },
      // Design tokens - Spacing (from design-system.md)
      spacing: {
        'micro': '4px',   // --space-micro
        'small': '8px',   // --space-small
        'medium': '16px', // --space-medium
        'large': '24px',  // --space-large
        'major': '48px',  // --space-major
        'hero': '64px',   // --space-hero
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // Design tokens - Border Radius (from design-system.md)
      borderRadius: {
        'sm': '0.375rem',  // 6px
        'md': '0.5rem',    // 8px
        'lg': '0.75rem',   // 12px
        'xl': '1rem',      // 16px - primary cards/modals
        '2xl': '1.5rem',   // 24px - large cards/hero
        '3xl': '2rem',     // 32px
        'full': '9999px',
      },
      // Design tokens - Typography
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.33' }],      // Tiny: 12px
        'sm': ['0.875rem', { lineHeight: '1.5' }],      // Small: 14px
        'base': ['1rem', { lineHeight: '1.7' }],        // Body: 16px
        'lg': ['1.125rem', { lineHeight: '1.6' }],      // 18px
        'xl': ['1.25rem', { lineHeight: '1.4' }],       // H4: 20px
        '2xl': ['1.5rem', { lineHeight: '1.33' }],      // H3: 24px
        '3xl': ['2rem', { lineHeight: '1.25' }],        // H2: 32px
        '4xl': ['2.5rem', { lineHeight: '1.2' }],       // H1: 40px
        '5xl': ['3rem', { lineHeight: '1.1' }],
      },
      letterSpacing: {
        'tighter': '-0.025em',  // H1
        'tight': '-0.02em',     // H2
        'snug': '-0.015em',     // H3
        'normal': '0',
      },
      // Animation durations
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'ease-out-cubic': 'cubic-bezier(0.33, 1, 0.68, 1)',
        'ease-in-cubic': 'cubic-bezier(0.32, 0, 0.67, 0)',
      },
      // Keyframe animations (from design-system.md)
      keyframes: {
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fadeInUp': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'checkDraw': {
          '0%': { strokeDashoffset: '24' },
          '100%': { strokeDashoffset: '0' },
        },
        'pulseGlow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(99, 102, 241, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(99, 102, 241, 0.1)' },
        },
        'spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite linear',
        'fadeInUp': 'fadeInUp 300ms ease-out-cubic',
        'checkDraw': 'checkDraw 400ms ease-out-cubic forwards',
        'pulseGlow': 'pulseGlow 2s ease-in-out infinite',
        'spin': 'spin 1s linear infinite',
        'fade-in': 'fade-in 250ms ease-out',
        'slide-up': 'slide-up 250ms ease-out',
        'slide-down': 'slide-down 250ms ease-out',
        'scale-in': 'scale-in 300ms ease-out-cubic',
      },
      // Shadows (from design-system.md)
      boxShadow: {
        'resting': 'var(--shadow-resting)',
        'raised': 'var(--shadow-raised)',
        'elevated': 'var(--shadow-elevated)',
        'floating': 'var(--shadow-floating)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      },
    },
  },
  plugins: [],
}
