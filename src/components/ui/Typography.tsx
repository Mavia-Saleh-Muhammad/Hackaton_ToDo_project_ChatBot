/**
 * Typography Components (T050-T053)
 * Flagship UI typography scale with semantic heading levels.
 *
 * Features:
 * - H1-H4 headings with proper weights and letter-spacing
 * - Body, Small, Tiny text with appropriate line-heights
 * - Text opacity hierarchy for visual depth
 * - Dark mode support
 */

import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * H1 - Hero titles (40px, weight 800, tracking -0.025em)
 */
export function H1({ children, className = '', as: Tag = 'h1' }: TypographyProps) {
  return (
    <Tag
      className={`
        text-4xl font-extrabold leading-tight tracking-tighter
        text-slate-900 dark:text-slate-50
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {children}
    </Tag>
  );
}

/**
 * H2 - Page titles (32px, weight 700, tracking -0.02em)
 */
export function H2({ children, className = '', as: Tag = 'h2' }: TypographyProps) {
  return (
    <Tag
      className={`
        text-3xl font-bold leading-snug tracking-tight
        text-slate-900 dark:text-slate-50
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {children}
    </Tag>
  );
}

/**
 * H3 - Section headers (24px, weight 600, tracking -0.015em)
 */
export function H3({ children, className = '', as: Tag = 'h3' }: TypographyProps) {
  return (
    <Tag
      className={`
        text-2xl font-semibold leading-normal tracking-snug
        text-slate-900 dark:text-slate-50
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {children}
    </Tag>
  );
}

/**
 * H4 - Subsection headers (20px, weight 600, tracking -0.01em)
 */
export function H4({ children, className = '', as: Tag = 'h4' }: TypographyProps) {
  return (
    <Tag
      className={`
        text-xl font-semibold leading-relaxed
        text-slate-900 dark:text-slate-50
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {children}
    </Tag>
  );
}

/**
 * Body - Primary body text (16px, weight 400, line-height 1.7)
 */
export function Body({ children, className = '', as: Tag = 'p' }: TypographyProps) {
  return (
    <Tag
      className={`
        text-base font-normal leading-relaxed
        text-slate-700 dark:text-slate-300
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {children}
    </Tag>
  );
}

/**
 * BodySecondary - Secondary body text with reduced opacity
 */
export function BodySecondary({ children, className = '', as: Tag = 'p' }: TypographyProps) {
  return (
    <Tag
      className={`
        text-base font-normal leading-relaxed
        text-slate-600 dark:text-slate-400
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {children}
    </Tag>
  );
}

/**
 * Small - Labels and captions (14px, weight 400, line-height 1.5)
 */
export function Small({ children, className = '', as: Tag = 'span' }: TypographyProps) {
  return (
    <Tag
      className={`
        text-sm font-normal leading-normal
        text-slate-600 dark:text-slate-400
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {children}
    </Tag>
  );
}

/**
 * Tiny - Metadata text (12px, weight 500, line-height 1.33)
 */
export function Tiny({ children, className = '', as: Tag = 'span' }: TypographyProps) {
  return (
    <Tag
      className={`
        text-xs font-medium leading-tight
        text-slate-500 dark:text-slate-500
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {children}
    </Tag>
  );
}

/**
 * Label - Form labels (14px, weight 500)
 */
export function Label({ children, className = '', ...props }: Omit<TypographyProps, 'as'> & React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={`
        text-sm font-medium
        text-slate-700 dark:text-slate-300
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      {...props}
    >
      {children}
    </label>
  );
}

export default {
  H1,
  H2,
  H3,
  H4,
  Body,
  BodySecondary,
  Small,
  Tiny,
  Label,
};
