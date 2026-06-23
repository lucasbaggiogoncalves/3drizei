// 3drizei storefront — demo catalog data.
// Images are intentionally omitted: products render as warm clay placeholders
// with a category icon, so the kit ships honestly without invented photography.
window.STORE_CATEGORIES = ['Todos', 'Presentes', 'Decoração', 'Festas', 'Casa'];

window.STORE_PRODUCTS = [
  { id: 'p1', title: 'Luminária Lua personalizada', price: 11990, cat: 'Decoração', icon: 'moon', badge: 'Novo', rating: 4.9, count: 128, tint: 'var(--terracotta-50)',
    desc: 'Luminária em PLA translúcido com o nome ou a data que você escolher gravados na base. Luz quente, perfeita para o quarto.' },
  { id: 'p2', title: 'Vaso geométrico com nome', price: 7990, cat: 'Decoração', rating: 4.8, count: 64, tint: 'var(--copper-50)',
    desc: 'Vaso decorativo de facetas, com nome em relevo. Para suculentas ou flores secas.' },
  { id: 'p3', title: 'Topo de bolo personalizado', price: 4990, cat: 'Festas', icon: 'cake', badge: 'Sob encomenda', rating: 5, count: 210, tint: 'var(--terracotta-50)',
    desc: 'Topo de bolo com nome e idade. Escolha a fonte e a cor do filamento.' },
  { id: 'p4', title: 'Chaveiro com nome em relevo', price: 2990, cat: 'Presentes', icon: 'key-round', rating: 4.7, count: 96, tint: 'var(--clay-100)',
    desc: 'Chaveiro resistente, leve, com o nome em alto relevo. Lembrancinha perfeita.' },
  { id: 'p5', title: 'Porta-retrato litofania 3D', price: 8990, cat: 'Presentes', icon: 'image', badge: 'Mais amado', rating: 4.9, count: 173, tint: 'var(--copper-50)',
    desc: 'Sua foto vira uma litofania: na luz, a imagem aparece em detalhes. Emoção que se acende.' },
  { id: 'p6', title: 'Caneca geométrica decorativa', price: 5990, cat: 'Casa', icon: 'coffee', rating: 4.6, count: 41, tint: 'var(--clay-100)',
    desc: 'Caneca decorativa de facetas para a estante ou a mesa de trabalho.' },
  { id: 'p7', title: 'Suporte de fone escultural', price: 6990, cat: 'Casa', icon: 'headphones', rating: 4.8, count: 52, tint: 'var(--terracotta-50)',
    desc: 'Suporte de mesa para headset, com base pesada e acabamento fosco.' },
  { id: 'p8', title: 'Plaquinha de porta personalizada', price: 3990, cat: 'Decoração', icon: 'door-open', rating: 4.7, count: 88, tint: 'var(--copper-50)',
    desc: 'Plaquinha com nome e ícone à sua escolha. Para o quarto das crianças ou o home office.' },
  { id: 'p9', title: 'Mini busto personalizado', price: 14990, cat: 'Presentes', icon: 'user-round', badge: 'Edição especial', rating: 4.9, count: 37, tint: 'var(--terracotta-50)',
    desc: 'A partir de uma foto, modelamos um mini busto seu — ou de quem você ama.' },
];

window.fmtBRL = (cents) => 'R$\u00A0' + (cents / 100).toFixed(2).replace('.', ',');
