import React from 'react';

/** Inline alert / message banner. */
export function Alert({ tone = 'info', title, icon, onClose, children, style = {}, ...rest }) {
  const tones = {
    info:    ['var(--info-50)', 'var(--info-700)', 'var(--info-500)'],
    success: ['var(--success-50)', 'var(--success-700)', 'var(--success-500)'],
    warning: ['var(--warning-50)', 'var(--warning-700)', 'var(--warning-500)'],
    danger:  ['var(--danger-50)', 'var(--danger-700)', 'var(--danger-500)'],
    brand:   ['var(--terracotta-50)', 'var(--terracotta-700)', 'var(--terracotta-500)'],
  };
  const [bg, fg, accent] = tones[tone] || tones.info;

  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: '12px',
      padding: '14px 16px', background: bg,
      borderRadius: 'var(--radius-lg)',
      borderLeft: `3px solid ${accent}`,
      ...style,
    }} {...rest}>
      {icon && <span style={{ color: accent, display: 'inline-flex', marginTop: 1 }}>{icon}</span>}
      <div style={{ flex: 1 }}>
        {title && <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-semibold)',
          fontSize: 'var(--text-base)', color: fg, marginBottom: children ? 2 : 0,
        }}>{title}</div>}
        {children && <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-body)', lineHeight: 1.5 }}>{children}</div>}
      </div>
      {onClose && (
        <button aria-label="Fechar" onClick={onClose} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: fg, opacity: 0.6, fontSize: 18, lineHeight: 1, padding: 0,
        }}>×</button>
      )}
    </div>
  );
}
