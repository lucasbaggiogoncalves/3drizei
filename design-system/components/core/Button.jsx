import React from 'react';

/**
 * 3drizei Button — the primary action primitive.
 * Rounded, warm, tactile. Press shrinks slightly; hover deepens + lifts.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  full = false,
  type = 'button',
  iconLeft = null,
  iconRight = null,
  disabled = false,
  children,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { height: 'var(--control-sm)', padding: '0 16px', font: 'var(--text-sm)', gap: '6px' },
    md: { height: 'var(--control-md)', padding: '0 22px', font: 'var(--text-base)', gap: '8px' },
    lg: { height: 'var(--control-lg)', padding: '0 30px', font: 'var(--text-lg)', gap: '10px' },
  };

  const variants = {
    primary: {
      background: 'var(--action-bg)',
      color: 'var(--action-fg)',
      border: '1px solid transparent',
    },
    secondary: {
      background: 'var(--copper-500)',
      color: 'var(--text-on-brand)',
      border: '1px solid transparent',
    },
    outline: {
      background: 'transparent',
      color: 'var(--terracotta-600)',
      border: '2px solid var(--terracotta-500)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-brand)',
      border: '1px solid transparent',
    },
    inverse: {
      background: 'var(--clay-950)',
      color: 'var(--clay-50)',
      border: '1px solid transparent',
    },
  };

  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    width: full ? '100%' : 'auto',
    height: s.height,
    padding: s.padding,
    fontFamily: 'var(--font-display)',
    fontWeight: 'var(--fw-semibold)',
    fontSize: s.font,
    lineHeight: 1,
    letterSpacing: '0.005em',
    borderRadius: 'var(--radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'transform var(--dur-fast) var(--ease-soft), background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    ...v,
    ...style,
  };

  const hoverBg = {
    primary: 'var(--action-bg-hover)',
    secondary: 'var(--copper-600)',
    outline: 'var(--terracotta-50)',
    ghost: 'var(--terracotta-50)',
    inverse: 'var(--clay-800)',
  }[variant];

  const onEnter = (e) => {
    if (disabled) return;
    e.currentTarget.style.background = hoverBg;
    if (variant === 'primary') e.currentTarget.style.boxShadow = 'var(--shadow-brand)';
    e.currentTarget.style.transform = 'translateY(-1px)';
  };
  const onLeave = (e) => {
    if (disabled) return;
    e.currentTarget.style.background = v.background;
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.transform = 'none';
  };
  const onDown = (e) => { if (!disabled) e.currentTarget.style.transform = 'scale(0.96)'; };
  const onUp = (e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(-1px)'; };

  return (
    <button
      type={type}
      disabled={disabled}
      style={base}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseDown={onDown}
      onMouseUp={onUp}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
