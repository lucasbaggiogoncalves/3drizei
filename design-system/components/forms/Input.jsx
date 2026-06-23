import React from 'react';

/**
 * Text input with optional label, leading icon, and hint/error.
 */
export function Input({
  label, hint, error, leftIcon, id,
  size = 'md', style = {}, ...rest
}) {
  const heights = { sm: 'var(--control-sm)', md: 'var(--control-md)', lg: 'var(--control-lg)' };
  const inputId = id || (label ? `in-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = error ? 'var(--danger-500)' : 'var(--border-default)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', ...style }}>
      {label && (
        <label htmlFor={inputId} style={{
          fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-semibold)',
          fontSize: 'var(--text-sm)', color: 'var(--text-strong)',
        }}>{label}</label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {leftIcon && (
          <span style={{
            position: 'absolute', left: '14px', display: 'inline-flex',
            color: 'var(--text-subtle)', pointerEvents: 'none',
          }}>{leftIcon}</span>
        )}
        <input
          id={inputId}
          style={{
            width: '100%', height: heights[size], boxSizing: 'border-box',
            padding: leftIcon ? '0 16px 0 42px' : '0 16px',
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)',
            color: 'var(--text-body)', background: 'var(--surface-card)',
            border: `1px solid ${borderColor}`, borderRadius: 'var(--radius-md)',
            outline: 'none',
            transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = error ? 'var(--danger-500)' : 'var(--terracotta-500)';
            e.target.style.boxShadow = 'var(--ring)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = borderColor;
            e.target.style.boxShadow = 'none';
          }}
          {...rest}
        />
      </div>
      {(hint || error) && (
        <span style={{
          fontSize: 'var(--text-xs)',
          color: error ? 'var(--danger-500)' : 'var(--text-subtle)',
        }}>{error || hint}</span>
      )}
    </div>
  );
}
