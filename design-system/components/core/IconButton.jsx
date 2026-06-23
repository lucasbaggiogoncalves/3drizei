import React from 'react';

/**
 * Circular icon-only button. Pass a Lucide icon (or any node) as children.
 */
export function IconButton({
  variant = 'soft',
  size = 'md',
  label,
  disabled = false,
  children,
  style = {},
  ...rest
}) {
  const dims = { sm: 36, md: 44, lg: 54 }[size] || 44;

  const variants = {
    soft:    { background: 'var(--terracotta-50)', color: 'var(--terracotta-600)', border: '1px solid transparent' },
    solid:   { background: 'var(--action-bg)', color: 'var(--action-fg)', border: '1px solid transparent' },
    outline: { background: 'var(--surface-card)', color: 'var(--text-body)', border: '1px solid var(--border-default)' },
    ghost:   { background: 'transparent', color: 'var(--text-muted)', border: '1px solid transparent' },
  };
  const v = variants[variant] || variants.soft;

  const hover = {
    soft: 'var(--terracotta-100)',
    solid: 'var(--action-bg-hover)',
    outline: 'var(--clay-50)',
    ghost: 'var(--clay-100)',
  }[variant];

  return (
    <button
      aria-label={label}
      title={label}
      disabled={disabled}
      style={{
        width: dims, height: dims,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 'var(--radius-pill)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'background var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-soft)',
        ...v, ...style,
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = hover; }}
      onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.background = v.background; }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'scale(0.9)'; }}
      onMouseUp={(e) => { if (!disabled) e.currentTarget.style.transform = 'none'; }}
      {...rest}
    >
      {children}
    </button>
  );
}
