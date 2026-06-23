import React from 'react';

/**
 * Avatar — initials or image, circular. Warm clay fallback.
 */
export function Avatar({ src, name = '', size = 'md', style = {}, ...rest }) {
  const dims = { xs: 24, sm: 32, md: 44, lg: 60, xl: 88 }[size] || 44;
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <span
      style={{
        width: dims, height: dims,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 'var(--radius-pill)',
        background: src ? 'var(--clay-200)' : 'var(--copper-100)',
        color: 'var(--copper-700)',
        fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-semibold)',
        fontSize: Math.round(dims * 0.38),
        overflow: 'hidden', flex: 'none',
        border: '2px solid var(--surface-card)',
        boxShadow: 'var(--shadow-sm)',
        ...style,
      }}
      {...rest}
    >
      {src
        ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : (initials || '·')}
    </span>
  );
}
