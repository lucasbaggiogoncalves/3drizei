import React from 'react';

/**
 * Filter / category chip. Selectable and optionally removable.
 */
export function Tag({ selected = false, removable = false, onRemove, children, style = {}, ...rest }) {
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        padding: '6px 14px',
        background: selected ? 'var(--terracotta-500)' : 'var(--surface-card)',
        color: selected ? 'var(--text-on-brand)' : 'var(--text-body)',
        border: selected ? '1px solid var(--terracotta-500)' : '1px solid var(--border-default)',
        fontFamily: 'var(--font-body)', fontWeight: 'var(--fw-semibold)',
        fontSize: 'var(--text-sm)', lineHeight: 1.2,
        borderRadius: 'var(--radius-pill)',
        cursor: 'pointer', userSelect: 'none',
        transition: 'background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
        ...style,
      }}
      {...rest}
    >
      {children}
      {removable && (
        <span
          role="button"
          aria-label="Remover"
          onClick={(e) => { e.stopPropagation(); onRemove && onRemove(e); }}
          style={{ display: 'inline-flex', opacity: 0.7, fontSize: '14px', lineHeight: 1 }}
        >×</span>
      )}
    </span>
  );
}
