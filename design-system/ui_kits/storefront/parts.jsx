/* global React */
// 3drizei storefront — shared UI parts. Exports to window for sibling babel scripts.
const DS = window.Ds3drizeiDesignSystem_046328;
const { Badge, RatingStars, IconButton, Button } = DS;
const Ic = ({ n, s }) => <i data-lucide={n} style={s}></i>;

function Logo({ height = 40, onClick }) {
  return (
    <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
      <img src="../../assets/logo-badge-512.png" alt="3drizei" style={{ height, width: height, borderRadius: '50%' }} />
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.01em', color: 'var(--clay-950)' }}>
        <span style={{ color: 'var(--terracotta-500)' }}>3d</span>rizei
      </span>
    </button>
  );
}

function Header({ cartCount, onCart, onNav, active }) {
  const links = [['Início', 'home'], ['Loja', 'catalog'], ['Como funciona', 'home'], ['Contato', 'home']];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(251,245,239,0.86)', backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px', height: 72, display: 'flex', alignItems: 'center', gap: 24 }}>
        <Logo onClick={() => onNav('home')} />
        <nav style={{ display: 'flex', gap: 4, marginLeft: 12 }}>
          {links.map(([label, to], i) => (
            <button key={i} onClick={() => onNav(to)} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '8px 14px',
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15,
              color: active === to && to !== 'home' ? 'var(--terracotta-600)' : 'var(--text-body)',
              borderRadius: 'var(--radius-pill)',
            }}>{label}</button>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <i data-lucide="search" style={{ position: 'absolute', left: 14, width: 17, height: 17, color: 'var(--text-subtle)' }}></i>
            <input placeholder="Buscar presente…" style={{
              height: 42, width: 200, paddingLeft: 40, paddingRight: 14,
              border: '1px solid var(--border-default)', borderRadius: 'var(--radius-pill)',
              background: 'var(--surface-card)', fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none',
            }} />
          </div>
          <IconButton label="Favoritos" variant="ghost"><Ic n="heart" /></IconButton>
          <div style={{ position: 'relative' }}>
            <IconButton label="Sacola" variant="soft" onClick={onCart}><Ic n="shopping-bag" /></IconButton>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: -2, right: -2, minWidth: 20, height: 20, padding: '0 5px',
                background: 'var(--terracotta-500)', color: '#fff', borderRadius: 999,
                fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-display)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid var(--surface-page)',
              }}>{cartCount}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// Warm clay placeholder with category icon — the consistent product visual.
function ProductImage({ p, ratio = '1 / 1', big = false }) {
  return (
    <div style={{
      position: 'relative', aspectRatio: ratio,
      background: p.tint || 'var(--clay-100)', backgroundImage: 'var(--layerlines)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    }}>
      <i data-lucide={p.icon || 'gift'} style={{ width: big ? 110 : 56, height: big ? 110 : 56, color: 'var(--copper-400)', opacity: 0.62, strokeWidth: 1.3 }}></i>
    </div>
  );
}

function Tile({ p, onOpen, onAdd, liked, onLike }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onClick={() => onOpen(p)}
      style={{
        background: 'var(--surface-card)', border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)', overflow: 'hidden', cursor: 'pointer',
        boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        transform: hover ? 'translateY(-4px)' : 'none',
        transition: 'transform var(--dur-base) var(--ease-soft), box-shadow var(--dur-base) var(--ease-out)',
      }}>
      <div style={{ position: 'relative' }}>
        <ProductImage p={p} />
        {p.badge && <div style={{ position: 'absolute', top: 12, left: 12 }}><Badge tone="brand" variant="solid">{p.badge}</Badge></div>}
        <button aria-label="Favoritar" onClick={(e) => { e.stopPropagation(); onLike(p.id); }} style={{
          position: 'absolute', top: 10, right: 10, width: 38, height: 38, borderRadius: '50%', border: 'none', cursor: 'pointer',
          background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)',
        }}>
          <i data-lucide="heart" style={{ width: 18, height: 18, color: liked ? 'var(--terracotta-500)' : 'var(--clay-600)', fill: liked ? 'var(--terracotta-500)' : 'none' }}></i>
        </button>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ marginBottom: 6 }}><RatingStars value={p.rating} count={p.count} size={14} /></div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, color: 'var(--text-strong)', lineHeight: 1.25, marginBottom: 10, minHeight: 45 }}>{p.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--terracotta-600)' }}>{window.fmtBRL(p.price)}</span>
          <button aria-label="Adicionar" onClick={(e) => { e.stopPropagation(); onAdd(p); }} style={{
            width: 40, height: 40, borderRadius: 999, border: 'none', cursor: 'pointer', background: 'var(--terracotta-500)', color: '#fff',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--terracotta-600)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--terracotta-500)'}>
            <i data-lucide="plus" style={{ width: 19, height: 19 }}></i>
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ background: 'var(--clay-950)', color: 'var(--clay-300)', marginTop: 80 }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '56px 28px 36px', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 32 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <img src="../../assets/logo-badge-512.png" alt="" style={{ height: 44, width: 44, borderRadius: '50%' }} />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: '#fff' }}>
              <span style={{ color: 'var(--terracotta-400)' }}>3d</span>rizei
            </span>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 280, color: 'var(--clay-400)' }}>Impressão 3D personalizada. Decoração e presentes feitos para guardar memória.</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            {['instagram', 'message-circle', 'mail'].map((n) => (
              <span key={n} style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i data-lucide={n} style={{ width: 18, height: 18, color: 'var(--clay-200)' }}></i>
              </span>
            ))}
          </div>
        </div>
        {[['Loja', ['Presentes', 'Decoração', 'Festas', 'Casa']], ['Ajuda', ['Como funciona', 'Prazos', 'Trocas', 'Contato']], ['3drizei', ['Sobre', 'Personalização', 'Atacado', 'Blog']]].map(([h, items]) => (
          <div key={h}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: '#fff', marginBottom: 14 }}>{h}</div>
            {items.map((it) => <div key={it} style={{ fontSize: 14, padding: '5px 0', color: 'var(--clay-400)', cursor: 'pointer' }}>{it}</div>)}
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '20px 28px', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.05em', color: 'var(--clay-500)' }}>
        @3drizei · IMPRESSÃO 3D PERSONALIZADA · DECORAÇÃO | PRESENTES
      </div>
    </footer>
  );
}

Object.assign(window, { Logo, Header, Footer, Tile, ProductImage, Ic });
