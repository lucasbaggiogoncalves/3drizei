import React from 'react';

/**
 * Small status pill — "Novo", "Personalizável", "Esgotado", etc.
 */
export function Badge({ tone = 'brand', variant = 'soft', children, style = {}, ...rest }) {
  const tones = {
    brand:   { soft: ['var(--terracotta-50)', 'var(--terracotta-700)'], solid: ['var(--terracotta-500)', '#fff'] },
    copper:  { soft: ['var(--copper-50)', 'var(--copper-700)'], solid: ['var(--copper-500)', '#fff'] },
    neutral: { soft: ['var(--clay-100)', 'var(--clay-700)'], solid: ['var(--clay-700)', 'var(--clay-50)'] },
    success: { soft: ['var(--success-50)', 'var(--success-700)'], solid: ['var(--success-500)', '#fff'] },
    warning: { soft: ['var(--warning-50)', 'var(--warning-700)'], solid: ['var(--warning-500)', '#fff'] },
    danger:  { soft: ['var(--danger-50)', 'var(--danger-700)'], solid: ['var(--danger-500)', '#fff'] },
  };
  const [bg, fg] = (tones[tone] || tones.brand)[variant];

  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '5px',
        padding: '3px 10px',
        background: bg, color: fg,
        fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-semibold)',
        fontSize: 'var(--text-xs)', lineHeight: 1.4,
        borderRadius: 'var(--radius-pill)',
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
