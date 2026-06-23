# 3drizei — Design System

> **3drizei** · *Impressão 3D personalizada* · Decoração | Presentes · [@3drizei](https://instagram.com/3drizei)

A warm, handcrafted brand and design system for **3drizei**, a custom 3D-printing studio that makes **objetos com impacto emocional** — personalized decoration and gifts (luminárias, litofanias, topos de bolo, mini bustos, plaquinhas) printed in 3D and finished by hand. The whole system is built to feel **tactile, affectionate, and memory-keeping** — not techy or cold.

## Sources
- `uploads/logo.png` — the brand badge (the only asset provided). Colors, type direction, and the gift/layer-line motifs were derived from it.
- No codebase, Figma, or product screenshots were provided. The storefront UI kit is therefore an **original brand-faithful interpretation**, not a recreation of existing product code.

---

## CONTENT FUNDAMENTALS — how 3drizei writes

- **Language:** Brazilian Portuguese (pt-BR). All product copy, labels, and CTAs are in Portuguese.
- **Voice:** warm, personal, a little poetic. The brand sells *meaning*, so copy leans on emotion and memory: *"Presentes que guardam memória"*, *"Feito com afeto"*, *"emoção que se acende"*.
- **Person:** speaks to the customer as **você**, and frames the customer as co-author: *"Você conta a história — um nome, uma data, um detalhe que importa."* The studio is **a gente / nós** ("a gente modela, imprime e acaba à mão").
- **Tone:** friendly and reassuring, never corporate. Short, human sentences. Concrete details (prazo de produção, cartão escrito à mão, retirada em BH) build trust.
- **Casing:** Sentence case for body and headings. The badge uses ALL-CAPS only for the wide-tracked descriptor line (`DECORAÇÃO | PRESENTES`) and the eyebrow labels — mirror that: caps are reserved for small mono "eyebrow" labels, never for headlines.
- **Emoji:** not used in the brand voice. Warmth comes from words and the palette, not emoji.
- **Numbers / specs:** prices as `R$ 119,90` (comma decimal, non-breaking space). Technical specs (material, dimensão, nº do pedido) are shown in the mono face to evoke the maker/3D-print world.
- **Vocabulary in use:** *personalizável, sob encomenda, feito à mão, camada por camada, litofania, filamento (PLA), acabamento, lembrança, afeto, memória.*

---

## VISUAL FOUNDATIONS

**Color.** A warm, earthy palette pulled straight from the printed badge:
- **Terracotta** `#C2440F` — primary action & brand accent (the vivid orange "3d").
- **Copper** `#94411F` — secondary/bronze accents (the gift mark), keepsake & "special" cues, star ratings.
- **Ink** `#1B1714` — warm near-black text & inverse surfaces.
- **Cream / Clay** `#F3E6DB` → full warm-grey neutral ramp (`--clay-50…950`). Page background is `--clay-50`, cards are white.
- Semantic colors are **muted/warm** (olive success, amber warning, clear-but-warm danger, muted-teal info) so they never clash with the earthy base.
- Never introduce blue-grey or cool tones; everything trends warm.

**Type.**
- **Fredoka** (rounded, friendly, geometric) for display & headings — the closest available match to the rounded logo wordmark. Weights 500/600/700, tight tracking (−0.02em) on large sizes.
- **Nunito Sans** for body — humanist, warm, highly legible, full PT support. 15–18px, line-height 1.6–1.7.
- **Space Mono** for eyebrows and technical specs — wide tracking (0.14em), uppercase, used sparingly.
- *Substitution flag:* the logo wordmark is bespoke; Fredoka stands in for it. See Caveats.

**Backgrounds & texture.** Mostly flat cream/white. The signature texture is the **layer-line motif** (`--layerlines`) — faint horizontal repeating lines echoing 3D-print extrusion layers — used on placeholders and hero panels. Two gradients only: `--gradient-warm` (terracotta→copper) and `--gradient-cream`. No photographic backgrounds, no noise/grain, no busy patterns.

**Imagery.** Warm, tactile, object-focused. Where real photos aren't available, products show a **warm clay placeholder + category icon** rather than stock imagery. Imagery vibe = warm, soft daylight, earthy — never cool or high-contrast b&w.

**Corner radii.** Generous and soft, echoing a filleted 3D print: cards `--radius-xl` (24px), inputs `--radius-md` (12px), buttons & chips fully **pill** (`--radius-pill`). Avoid sharp corners.

**Cards.** White surface, `1px` `--border-subtle` hairline, `--radius-xl`, soft `--shadow-sm`. Interactive cards **lift** (`translateY(-4px)`) and deepen to `--shadow-lg` on hover.

**Shadows.** Warm **brown-tinted** (`rgba(45,28,18,…)`), never blue-grey. Five-step elevation + a terracotta `--shadow-brand` glow for primary CTAs on hover.

**Borders.** Hairline `1px` clay borders; `2px` for outline buttons and emphasis. Left-accent edges appear only on `Alert`.

**Motion.** Gentle and warm. `--ease-soft` settles without overshoot (no playful bounce). Durations 120/200/320ms. Fades + small translateY lifts; cart drawer slides in. No infinite/looping decorative animation.

**Hover states.** Buttons darken one step + lift 1px (+ brand glow on primary); soft/ghost backgrounds tint toward terracotta-50/clay-100; cards lift. **Press states** shrink slightly (`scale(0.96)` buttons, `0.9` icon buttons) — tactile, like pressing a physical object.

**Transparency & blur.** Used lightly: the sticky header is translucent cream with `backdrop-filter: blur`; favorite buttons over imagery use a translucent white with blur. Cart overlay is a 40% ink scrim.

**Layout.** Max content width ~1180px, 28px gutters. Sticky translucent header. 4-up product grids. 4px spacing base unit.

---

## ICONOGRAPHY

- **System:** [Lucide](https://lucide.dev) via CDN — consistent rounded line icons, 1.3–2px stroke. This matches the soft, friendly, rounded brand voice. No icon binaries are bundled; cards & the UI kit load `lucide@0.460.0` from unpkg and call `lucide.createIcons()`.
  - *Substitution flag:* the brand has no documented icon set, so Lucide is the chosen default. Swap freely if the studio adopts another set.
- **Brand marks (raster):** `assets/logo-badge.png` (full-res badge), `assets/logo-badge-512.png` (512px). These are the real printed logo — use them as the avatar/mark and in headers/footers.
- **Emoji:** never used.
- **Unicode glyphs:** `×`, `−`, `+`, `|` appear as functional glyphs (close, stepper, divider) — not as decorative icons.
- **No hand-drawn SVG illustration** in the brand; the gift and layer-line shapes from the badge are the only proprietary marks.

---

## TOKENS — at a glance

| Concern | File | Notes |
|---|---|---|
| Fonts | `tokens/fonts.css` | Google Fonts `@import` — Fredoka, Nunito Sans, Space Mono |
| Color | `tokens/colors.css` | brand anchors + terracotta/copper/clay ramps + semantic aliases |
| Type | `tokens/typography.css` | families, weights, scale, tracking, role aliases |
| Spacing | `tokens/spacing.css` | 4px scale, radii, containers, control heights |
| Effects | `tokens/effects.css` | warm shadows, motion, gradients, layer-lines |
| Base | `tokens/base.css` | reset + element defaults + `.eyebrow` |

`styles.css` (root) is import-only and reaches every token + font file. **Consumers link `styles.css`.**

---

## INDEX — what's in this project

**Foundations** (`guidelines/`) — specimen cards shown in the Design System tab: brand/terracotta/copper/clay/semantic colors, display/body/mono/scale type, spacing/radii/elevation, logo + layer-line motif.

**Components** (`components/`) — React primitives, each with `.jsx` + `.d.ts` + `.prompt.md`:
- `core/` — **Button, IconButton, Badge, Tag, Avatar, Card**
- `forms/` — **Input, Textarea, Checkbox, Switch, QuantityStepper**
- `feedback/` — **Alert, RatingStars**
- `commerce/` — **ProductCard**

**UI kits** (`ui_kits/`):
- `storefront/` — interactive **Loja 3drizei** (home → catálogo → produto → sacola). See its `README.md`.

**Assets** (`assets/`) — `logo-badge.png`, `logo-badge-512.png`.

**Other** — `SKILL.md` (Agent-Skills compatible), this `readme.md`.

> Generated files `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json` are produced by the compiler — do not edit by hand.

---

## CAVEATS
- **Fonts are substitutes.** The logo wordmark is bespoke; **Fredoka** (display), **Nunito Sans** (body), **Space Mono** (specs) are the closest Google Fonts matches. They load from the Google Fonts CDN (not self-hosted), so the compiler lists 0 bundled `@font-face` fonts. *If you have the real brand fonts, send the files and they'll be self-hosted.*
- **Icons are Lucide** (CDN), chosen as a sensible default — the brand has no documented icon set.
- **Storefront is an original interpretation** — no product code/Figma was provided. Product photos are warm clay placeholders, not real imagery.
