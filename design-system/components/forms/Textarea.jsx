import React from 'react';

/** Multi-line text area — for personalization notes. */
export function Textarea({ label, hint, error, id, rows = 4, style = {}, ...rest }) {
  const inputId = id || (label ? `ta-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = error ? 'var(--danger-500)' : 'var(--border-default)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', ...style }}>
      {label && (
        <label htmlFor={inputId} style={{
          fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-semibold)',
          fontSize: 'var(--text-sm)', color: 'var(--text-strong)',
        }}>{label}</label>
      )}
      <textarea
        id={inputId}
        rows={rows}
        style={{
          width: '100%', boxSizing: 'border-box', padding: '12px 16px',
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)',
          lineHeight: 'var(--leading-normal)',
          color: 'var(--text-body)', background: 'var(--surface-card)',
          border: `1px solid ${borderColor}`, borderRadius: 'var(--radius-md)',
          outline: 'none', resize: 'vertical',
          transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
        }}
        onFocus={(e) => { e.target.style.borderColor = 'var(--terracotta-500)'; e.target.style.boxShadow = 'var(--ring)'; }}
        onBlur={(e) => { e.target.style.borderColor = borderColor; e.target.style.boxShadow = 'none'; }}
        {...rest}
      />
      {(hint || error) && (
        <span style={{ fontSize: 'var(--text-xs)', color: error ? 'var(--danger-500)' : 'var(--text-subtle)' }}>{error || hint}</span>
      )}
    </div>
  );
}
