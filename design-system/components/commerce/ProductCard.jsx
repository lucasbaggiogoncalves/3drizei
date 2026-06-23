import React from 'react';
import { Badge } from '../core/Badge.jsx';
import { RatingStars } from '../feedback/RatingStars.jsx';

/**
 * Product card for the 3drizei storefront. Image, title, price, badges, rating.
 * When no `image` is given, shows a warm clay placeholder with layer-line texture.
 */
export function ProductCard({
  title, price, image, badge, rating, ratingCount,
  liked = false, onLike, onAdd, style = {}, ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [fav, setFav] = React.useState(liked);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        transform: hover ? 'translateY(-4px)' : 'none',
        transition: 'transform var(--dur-base) var(--ease-soft), box-shadow var(--dur-base) var(--ease-out)',
        ...style,
      }}
      {...rest}
    >
      <div style={{
        position: 'relative', aspectRatio: '1 / 1',
        background: image ? 'var(--clay-100)' : 'var(--clay-100)',
        backgroundImage: image ? `url(${image})` : 'var(--layerlines)',
        backgroundSize: image ? 'cover' : 'auto', backgroundPosition: 'center',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {!image && (
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--copper-400)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
            <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
          </svg>
        )}
        {badge && <div style={{ position: 'absolute', top: 12, left: 12 }}><Badge tone="brand" variant="solid">{badge}</Badge></div>}
        <button
          aria-label="Favoritar"
          onClick={(e) => { e.stopPropagation(); setFav(!fav); onLike && onLike(!fav); }}
          style={{
            position: 'absolute', top: 10, right: 10,
            width: 38, height: 38, borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <svg width="19" height="19" viewBox="0 0 24 24"
            fill={fav ? 'var(--terracotta-500)' : 'none'}
            stroke={fav ? 'var(--terracotta-500)' : 'var(--clay-600)'}
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      <div style={{ padding: 'var(--space-4)' }}>
        {rating != null && (
          <div style={{ marginBottom: 6 }}>
            <RatingStars value={rating} count={ratingCount} size={14} />
          </div>
        )}
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-semibold)',
          fontSize: 'var(--text-lg)', color: 'var(--text-strong)', lineHeight: 1.25,
          marginBottom: 8,
        }}>{title}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-bold)',
            fontSize: 'var(--text-xl)', color: 'var(--terracotta-600)',
          }}>{price}</span>
          <button
            aria-label="Adicionar"
            onClick={(e) => { e.stopPropagation(); onAdd && onAdd(); }}
            style={{
              width: 40, height: 40, borderRadius: 'var(--radius-pill)', border: 'none', cursor: 'pointer',
              background: 'var(--terracotta-500)', color: '#fff',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background var(--dur-base) var(--ease-out)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--terracotta-600)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--terracotta-500)'}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
