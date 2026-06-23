/* global React */
const _DS = window.Ds3drizeiDesignSystem_046328;
const { Button, Badge, Tag, RatingStars, Input, Textarea, Checkbox, QuantityStepper, Alert, Avatar } = _DS;

/* ---------------- HERO ---------------- */
function Hero({ onShop }) {
  return (
    <section style={{ maxWidth: 1180, margin: '0 auto', padding: '52px 28px 8px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 40, alignItems: 'center' }}>
        <div>
          <span className="eyebrow">Decoração · Presentes</span>
          <h1 style={{ fontSize: 56, lineHeight: 1.04, margin: '16px 0 18px', letterSpacing: '-0.02em' }}>
            Presentes que<br />guardam <span style={{ color: 'var(--terracotta-500)' }}>memória</span>
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: 460, marginBottom: 28 }}>
            Você conta a história — um nome, uma data, um detalhe que importa. A gente modela, imprime em 3D e acaba à mão.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <Button variant="primary" size="lg" iconRight={<i data-lucide="arrow-right"></i>} onClick={onShop}>Ver a loja</Button>
            <Button variant="outline" size="lg" iconLeft={<i data-lucide="sparkles"></i>}>Personalizar</Button>
          </div>
          <div style={{ display: 'flex', gap: 26, marginTop: 34 }}>
            {[['4.9', 'avaliação média'], ['+1.2k', 'peças entregues'], ['100%', 'feito sob medida']].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 26, color: 'var(--clay-950)' }}>{n}</div>
                <div style={{ fontSize: 13, color: 'var(--text-subtle)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{
          position: 'relative', aspectRatio: '4 / 3', borderRadius: 'var(--radius-2xl)',
          background: 'var(--gradient-cream)', backgroundImage: 'var(--layerlines)',
          border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-lg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        }}>
          <img src="../../assets/logo-badge-512.png" alt="3drizei" style={{ width: '52%', filter: 'drop-shadow(0 16px 30px rgba(45,28,18,0.18))' }} />
          <div style={{ position: 'absolute', bottom: 18, left: 18, background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <i data-lucide="layers" style={{ width: 20, height: 20, color: 'var(--copper-500)' }}></i>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, color: 'var(--clay-950)' }}>Camada por camada</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>impresso e acabado à mão</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- VALUE STRIP ---------------- */
function ValueStrip() {
  const items = [
    ['palette', 'Você escolhe', 'cor, nome, fonte e acabamento'],
    ['box', 'Embalado para presentear', 'caixa kraft + cartão escrito à mão'],
    ['truck', 'Enviamos para todo o Brasil', 'e retirada em Belo Horizonte'],
  ];
  return (
    <section style={{ maxWidth: 1180, margin: '0 auto', padding: '40px 28px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {items.map(([ic, t, d]) => (
          <div key={t} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '18px 20px' }}>
            <span style={{ width: 44, height: 44, flex: 'none', borderRadius: '50%', background: 'var(--terracotta-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i data-lucide={ic} style={{ width: 21, height: 21, color: 'var(--terracotta-600)' }}></i>
            </span>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: 'var(--clay-950)' }}>{t}</div>
              <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 2 }}>{d}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- HOME ---------------- */
function Home({ products, onOpen, onAdd, onShop, liked, onLike }) {
  const featured = products.slice(0, 4);
  return (
    <div>
      <Hero onShop={onShop} />
      <ValueStrip />
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '12px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <span className="eyebrow">Favoritos da casa</span>
            <h2 style={{ fontSize: 32, margin: '8px 0 0' }}>Mais presenteados</h2>
          </div>
          <Button variant="ghost" iconRight={<i data-lucide="arrow-right"></i>} onClick={onShop}>Ver tudo</Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
          {featured.map((p) => <window.Tile key={p.id} p={p} onOpen={onOpen} onAdd={onAdd} liked={liked.has(p.id)} onLike={onLike} />)}
        </div>
      </section>
    </div>
  );
}

/* ---------------- CATALOG ---------------- */
function Catalog({ products, onOpen, onAdd, liked, onLike }) {
  const [cat, setCat] = React.useState('Todos');
  const list = cat === 'Todos' ? products : products.filter((p) => p.cat === cat);
  return (
    <section style={{ maxWidth: 1180, margin: '0 auto', padding: '40px 28px' }}>
      <span className="eyebrow">Loja 3drizei</span>
      <h1 style={{ fontSize: 40, margin: '10px 0 4px' }}>Todos os presentes</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 16, marginBottom: 24 }}>Cada peça pode ser personalizada com nome, data ou foto.</p>
      <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
        {window.STORE_CATEGORIES.map((c) => <Tag key={c} selected={cat === c} onClick={() => setCat(c)}>{c}</Tag>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
        {list.map((p) => <window.Tile key={p.id} p={p} onOpen={onOpen} onAdd={onAdd} liked={liked.has(p.id)} onLike={onLike} />)}
      </div>
    </section>
  );
}

/* ---------------- PRODUCT DETAIL ---------------- */
function Product({ p, onBack, onAdd }) {
  const [qty, setQty] = React.useState(1);
  const [name, setName] = React.useState('');
  const [color, setColor] = React.useState('Terracota');
  const [wrap, setWrap] = React.useState(true);
  const colors = [['Terracota', 'var(--terracotta-500)'], ['Cobre', 'var(--copper-500)'], ['Areia', 'var(--clay-300)'], ['Grafite', 'var(--clay-900)']];
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 28px 0' }}>
      <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, marginBottom: 18 }}>
        <i data-lucide="arrow-left" style={{ width: 16, height: 16 }}></i> Voltar para a loja
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
        <div style={{ borderRadius: 'var(--radius-2xl)', overflow: 'hidden', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)' }}>
          <window.ProductImage p={p} big ratio="1 / 1" />
        </div>
        <div>
          {p.badge && <Badge tone="brand">{p.badge}</Badge>}
          <h1 style={{ fontSize: 34, margin: '12px 0 10px', lineHeight: 1.1 }}>{p.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <RatingStars value={p.rating} count={p.count} size={17} />
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, color: 'var(--terracotta-600)', marginBottom: 16 }}>{window.fmtBRL(p.price)}</div>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--text-body)', marginBottom: 22 }}>{p.desc}</p>

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Input label="Texto para gravar" placeholder="Nome, data ou frase curta" value={name} onChange={(e) => setName(e.target.value)} leftIcon={<i data-lucide="type"></i>} />
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, color: 'var(--text-strong)', marginBottom: 8 }}>Cor do filamento</div>
              <div style={{ display: 'flex', gap: 10 }}>
                {colors.map(([label, c]) => (
                  <button key={label} onClick={() => setColor(label)} title={label} style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px 7px 8px', cursor: 'pointer',
                    borderRadius: 'var(--radius-pill)', background: color === label ? 'var(--terracotta-50)' : 'var(--surface-card)',
                    border: color === label ? '1.5px solid var(--terracotta-500)' : '1px solid var(--border-default)',
                    fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--text-body)',
                  }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: c, border: '1px solid rgba(0,0,0,0.1)' }}></span>{label}
                  </button>
                ))}
              </div>
            </div>
            <Checkbox label="Embrulhar para presente (+ cartão escrito à mão)" checked={wrap} onChange={setWrap} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 4 }}>
              <QuantityStepper value={qty} onChange={setQty} max={20} />
              <Button variant="primary" size="lg" full iconLeft={<i data-lucide="shopping-bag"></i>} onClick={() => onAdd(p, qty)}>
                Adicionar — {window.fmtBRL(p.price * qty)}
              </Button>
            </div>
            <div style={{ display: 'flex', gap: 18, marginTop: 4, color: 'var(--text-muted)', fontSize: 13 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><i data-lucide="clock" style={{ width: 15, height: 15 }}></i> Produção 5–7 dias úteis</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><i data-lucide="shield-check" style={{ width: 15, height: 15 }}></i> Garantia 3drizei</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CART DRAWER ---------------- */
function CartDrawer({ open, items, onClose, onQty, onRemove }) {
  const total = items.reduce((s, it) => s + it.p.price * it.qty, 0);
  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(27,23,20,0.4)', zIndex: 90,
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity var(--dur-base) var(--ease-out)',
      }}></div>
      <aside style={{
        position: 'fixed', top: 0, right: 0, height: '100%', width: 420, maxWidth: '92vw', zIndex: 100,
        background: 'var(--surface-page)', boxShadow: 'var(--shadow-xl)',
        transform: open ? 'translateX(0)' : 'translateX(100%)', transition: 'transform var(--dur-slow) var(--ease-soft)',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '22px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)' }}>
          <h2 style={{ fontSize: 22, margin: 0 }}>Sua sacola</h2>
          <button onClick={onClose} aria-label="Fechar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><i data-lucide="x" style={{ width: 22, height: 22 }}></i></button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {items.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-subtle)' }}>
              <i data-lucide="shopping-bag" style={{ width: 40, height: 40, opacity: 0.4 }}></i>
              <p style={{ marginTop: 12 }}>Sua sacola está vazia.</p>
            </div>
          )}
          {items.map((it) => (
            <div key={it.key} style={{ display: 'flex', gap: 12, padding: 12, background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', marginBottom: 10 }}>
              <div style={{ width: 64, height: 64, flex: 'none', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: it.p.tint, backgroundImage: 'var(--layerlines)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i data-lucide={it.p.icon || 'gift'} style={{ width: 26, height: 26, color: 'var(--copper-400)', opacity: 0.7 }}></i>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: 'var(--text-strong)', lineHeight: 1.2 }}>{it.p.title}</div>
                <div style={{ fontSize: 13, color: 'var(--terracotta-600)', fontWeight: 700, marginTop: 2 }}>{window.fmtBRL(it.p.price)}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                  <QuantityStepper value={it.qty} onChange={(n) => onQty(it.key, n)} />
                  <button onClick={() => onRemove(it.key)} aria-label="Remover" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)' }}><i data-lucide="trash-2" style={{ width: 17, height: 17 }}></i></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div style={{ padding: 20, borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--clay-950)' }}>{window.fmtBRL(total)}</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-subtle)', margin: '0 0 14px' }}>Frete e prazos calculados no checkout.</p>
            <Button variant="primary" size="lg" full iconRight={<i data-lucide="arrow-right"></i>}>Finalizar pedido</Button>
          </div>
        )}
      </aside>
    </>
  );
}

Object.assign(window, { Home, Catalog, Product, CartDrawer });
