# Storefront UI kit — Loja 3drizei

An interactive, click-through recreation of the 3drizei online store. Built entirely on the design-system primitives (`Button`, `Badge`, `Tag`, `RatingStars`, `Input`, `Textarea`, `Checkbox`, `QuantityStepper`, `IconButton`, `Alert`).

> **Note on origin:** no production storefront code or Figma file was provided, so this kit is an original interpretation of how the brand would translate to e-commerce. It faithfully uses the real logo + extracted palette/type; product imagery is intentionally rendered as warm clay + layer-line placeholders (with category icons) rather than invented photography.

## Flow
`index.html` is a single-page app with state-driven routing:
1. **Home** — hero, value strip, "Mais presenteados" featured grid.
2. **Catálogo** — category filter chips + responsive product grid.
3. **Produto** — detail with personalization (text to engrave, filament color, gift wrap), quantity + add to cart.
4. **Sacola** — slide-over cart drawer with quantity edit, remove, subtotal, checkout CTA.
A toast confirms add-to-cart; a heart toggles favorites.

## Files
- `index.html` — app shell, routing, cart/toast state. Loads the DS bundle + Lucide.
- `data.js` — demo catalog (`window.STORE_PRODUCTS`, `STORE_CATEGORIES`, `fmtBRL`).
- `parts.jsx` — `Logo`, `Header`, `Footer`, `Tile`, `ProductImage`.
- `screens.jsx` — `Hero`, `ValueStrip`, `Home`, `Catalog`, `Product`, `CartDrawer`.

## Icons
Lucide (CDN), 1.3–2px stroke, rounded — matches the friendly rounded brand voice. Icons are re-hydrated with `lucide.createIcons()` after every React render.
