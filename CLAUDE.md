# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**3drizei** is a backoffice management system for a personalized 3D printing atelier. It manages orders via a Kanban workflow, products with variations, customers, expenses, pricing calculations, and financial dashboards. A public store frontend (`/app/(loja)/`) is planned but not yet built.

## Commands

```bash
pnpm dev          # Start development server (Turbopack)
pnpm build        # Production build
pnpm lint         # ESLint
pnpm typecheck    # TypeScript check (tsc --noEmit)
pnpm test         # Run Vitest tests once
pnpm test:watch   # Vitest in watch mode
pnpm db:types     # Regenerate lib/database.types.ts from Supabase schema
```

## Tech Stack

- **Framework**: Next.js (App Router) + React 19 + TypeScript (strict)
- **Styling**: Tailwind CSS 4 (CSS-first config with `@theme`) + shadcn/ui (radix-nova style, Lucide icons)
- **Database**: Supabase (PostgreSQL) with Row-Level Security; browser client uses publishable anon key + user sessions
- **Data fetching**: TanStack Query for reactive UI (Kanban); RSC + server actions elsewhere
- **Forms**: react-hook-form + Zod
- **Drag and drop**: @dnd-kit (Kanban board)
- **Deployment**: Vercel, São Paulo region (`gru1`)

## Architecture

### Auth & Middleware

- `proxy.ts` — Middleware router that refreshes Supabase sessions (cookie-based SSR) for all routes except static assets
- `lib/auth.ts` — `requireAdmin()`: validates JWT claims locally (no network call) and throws a redirect if the user lacks the admin role. Called at the top of protected layouts/pages for defense-in-depth
- `lib/supabase/server.ts` — SSR-safe Supabase client factory (cookie integration)
- `lib/supabase/client.ts` — Browser client (singleton)

### Data Layer

`lib/data/` contains one module per domain:
- `pedidos.ts` — Orders + Kanban view mapping
- `produtos.ts` — Products and variations
- `clientes.ts` — Customers
- `despesas.ts` — Expenses (with categories)
- `dashboard.ts` — Revenue/profit aggregations
- `pricing.ts` — Pricing settings queries
- `loja.ts` — Public store queries (future)

### Pricing Engine

`lib/pricing/engine.ts` is a **pure function** (no side effects, no DB calls) that calculates costs: material + machine time + energy + failure buffer + labor + consumables + packaging → margin → taxes. It is independently testable via Vitest (`lib/pricing/engine.test.ts`).

### Route Structure

```
app/
  layout.tsx              # Root layout; loads fonts (Fredoka, Nunito Sans, Space Mono)
  providers.tsx           # TanStack Query + theme provider
  admin/
    login/                # Auth forms (public)
    (dashboard)/          # Protected by requireAdmin() in layout
      page.tsx            # Dashboard (billing, profit, average ticket)
      pedidos/            # Kanban board + completed tab + CRUD
      produtos/           # Product + variation CRUD
      clientes/           # Customer CRUD + order history
      despesas/           # Expense CRUD + category management
      calculadora/        # Standalone pricing calculator
      configuracoes/      # Materials + versioned pricing parameters
  (loja)/                 # Public store (placeholder)
```

### Database

Migrations live in `supabase/migrations/` and must be applied in order. Key design decisions:

- **Monetary values** are always integers in centavos — never floats
- **Versioned pricing**: `pricing_settings` stores versions; each order/variation records the version used so historical calculations stay accurate when settings change
- **Snapshots on sale**: `pedido_itens` freezes price, cost, and breakdown at the time of the order
- **Computed columns**: `pedidos.total_centavos` and `lucro_centavos` are PostgreSQL `GENERATED ALWAYS AS ... STORED` columns
- **Kanban status**: completed orders are filtered out of the board into a separate tab (status enum defined in `lib/pedido-status.ts`)
- **Product visibility flags**: `ativo` (public store) and `disponivel_pedidos` (backoffice order creation) are independent
- **Expense categories**: `despesas.categoria_id` has `ON DELETE RESTRICT` — categories in use cannot be deleted
- **RLS**: all tables have RLS policies; `private.is_admin()` PostgreSQL function gates admin operations

## Key Conventions

- All monetary arithmetic in centavos (integers). Use `lib/format.ts` (`formatBRL()`) for display.
- `lib/database.types.ts` is auto-generated — edit via `pnpm db:types`, never manually.
- Path alias `@/*` maps to the project root.
- `components/ui/` contains shadcn/ui primitives; `components/admin/` contains domain-specific components.
- `design-system/` is reference documentation for brand tokens (terracotta/copper/clay palette) — not compiled or auto-imported; actual tokens are in Tailwind CSS config.

## Environment

Copy `.env.example` to `.env.local` and fill in:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
