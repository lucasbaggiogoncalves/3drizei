import React from 'react';

/** Star rating display / input. Copper-gold stars. */
export function RatingStars({ value = 0, max = 5, size = 18, onChange, count, style = {}, ...rest }) {
  const interactive = typeof onChange === 'function';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', ...style }} {...rest}>
      <span style={{ display: 'inline-flex', gap: '2px' }}>
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < Math.round(value);
          return (
            <svg
              key={i} width={size} height={size} viewBox="0 0 24 24"
              fill={filled ? 'var(--copper-400)' : 'none'}
              stroke={filled ? 'var(--copper-400)' : 'var(--clay-300)'}
              strokeWidth="1.8" strokeLinejoin="round"
              style={{ cursor: interactive ? 'pointer' : 'default' }}
              onClick={interactive ? () => onChange(i + 1) : undefined}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          );
        })}
      </span>
      {count != null && (
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginLeft: 2 }}>
          {value.toFixed(1)} ({count})
        </span>
      )}
    </span>
  );
}
