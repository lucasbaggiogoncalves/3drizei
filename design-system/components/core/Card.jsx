import React from 'react';

/**
 * Surface container. White, soft-rounded, warm shadow. Optional hover lift.
 */
export function Card({ interactive = false, padding = 'md', children, style = {}, ...rest }) {
  const pad = { none: '0', sm: 'var(--space-4)', md: 'var(--space-6)', lg: 'var(--space-8)' }[padding] ?? 'var(--space-6)';

  return (
    <div
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-sm)',
        padding: pad,
        transition: 'transform var(--dur-base) var(--ease-soft), box-shadow var(--dur-base) var(--ease-out)',
        ...style,
      }}
      onMouseEnter={interactive ? (e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      } : undefined}
      onMouseLeave={interactive ? (e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      } : undefined}
      {...rest}
    >
      {children}
    </div>
  );
}
