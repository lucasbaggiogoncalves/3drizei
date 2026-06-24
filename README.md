# 3drizei · Backoffice

Painel de gestão para o ateliê de impressão 3D personalizada **3drizei**. Concentra
pedidos (kanban de produção), produtos com variações, clientes, despesas,
precificação e um dashboard de faturamento e lucro real. A loja pública (`(loja)`)
virá numa segunda etapa.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS 4** (CSS-first via `@theme`) + **shadcn/ui**, tematizados com os
  tokens do `design-system/` (paleta terracota/cobre/clay, fontes Fredoka /
  Nunito Sans / Space Mono, sombras quentes, motivo de _layer lines_)
- **Supabase** (Postgres, Auth, Storage, RLS) via `@supabase/ssr`
- **TanStack Query** (kanban reativo) + **@dnd-kit** (drag-and-drop)
- **react-hook-form** + **Zod** nos formulários
- **Vitest** nos testes do motor de precificação

## Pré-requisitos

- Node 20+ e **pnpm**
- Um projeto Supabase (este repo usa o ref `ltwsfidikqoqxfliusgd`)

## Configuração

1. Instale as dependências:

```bash
pnpm install
```

2. Crie o `.env.local` (veja `.env.example`):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://ltwsfidikqoqxfliusgd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
```

> Só a chave **publishable** (segura para o browser) é necessária — o admin opera
> com a sessão do próprio usuário e a RLS cuida do acesso.

3. Banco de dados: as migrations em `supabase/migrations/` já foram aplicadas no
   projeto Supabase. Para um ambiente novo, aplique-as na ordem (CLI do Supabase
   ou SQL editor). Para regenerar os tipos após mudanças no schema:

```bash
pnpm db:types
```

4. Crie o usuário admin:
   - No painel do Supabase: **Authentication → Users → Add user** (email + senha).
     Isso cria o `profile` automaticamente com role `customer`.
   - Promova a conta a admin:

```sql
update public.profiles set role = 'admin'
where id = (select id from auth.users where email = 'SEU_EMAIL');
```

5. Rode o servidor de desenvolvimento:

```bash
pnpm dev
```

Acesse [http://localhost:3000/admin](http://localhost:3000/admin) (a raiz redireciona
para `/admin`).

## Scripts

| Comando | Descrição |
| --- | --- |
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm build` | Build de produção |
| `pnpm start` | Sobe o build de produção |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | Testes (Vitest) |
| `pnpm db:types` | Gera `lib/database.types.ts` a partir do schema |

## Estrutura

```
app/
  admin/
    login/                # login branded + server actions de auth
    (dashboard)/          # área protegida (guarda de role no layout)
      page.tsx            # dashboard (faturamento, lucro real, ticket médio)
      pedidos/            # kanban (Em produção) + aba Concluídos + criar/editar pedido
      produtos/           # CRUD de produtos + variações
      clientes/           # CRUD de clientes + pedidos anteriores
      despesas/           # CRUD de despesas + gestão de categorias (abas)
      calculadora/        # calculadora de preço avulsa
      configuracoes/      # materiais + parâmetros de preço (versionados)
components/
  admin/                  # componentes do backoffice
  brand/                  # logo / marca
  ui/                     # shadcn/ui
lib/
  supabase/               # clients SSR (server, browser) + sessão
  data/                   # acesso a dados por domínio
  pricing/                # motor de precificação (função pura + testes)
  pedido-status.ts        # estágios do kanban + rótulos (Concluído excluído do board)
  pedido-types.ts         # tipos de payload de pedido (inclui descontoCentavos)
  database.types.ts       # tipos gerados do Supabase
supabase/migrations/      # schema versionado (RLS, triggers, buckets)
design-system/            # material de referência da marca (não buildado)
proxy.ts                  # proteção de rota /admin (ex-middleware)
```

## Conceitos importantes

- **Dinheiro em centavos**: todos os valores monetários são `integer` (centavos)
  no banco e no código — sem float.
- **Precificação versionada**: `pricing_settings` guarda versões; cada pedido/variação
  registra a versão usada, então mudanças de parâmetro não alteram cálculos antigos.
- **Snapshots no pedido**: `pedido_itens` congela preço, custo e breakdown no momento
  da venda.
- **Kanban enxuto**: três estágios de produção — Aprovado → Modelagem → Em fabricação.
  Pedidos concluídos saem do board e ficam numa aba separada na página de Pedidos.
- **Desconto no pedido**: `pedidos` tem `subtotal_centavos` (soma dos itens, via trigger),
  `desconto_centavos` (editável) e `total_centavos` / `lucro_centavos` gerados
  automaticamente pelo Postgres (`generated always as ... stored`).
- **Categorias de despesa referenciadas**: `despesa_categorias` é uma tabela gerenciada
  (aba "Categorias" em Despesas); `despesas.categoria_id` é FK com `on delete restrict`
  — categorias em uso não podem ser excluídas.
- **Dois flags de visibilidade no produto**: `ativo` controla exibição na loja pública
  (futura); `disponivel_pedidos` controla se o produto aparece no seletor ao criar pedidos
  no backoffice. Os dois são independentes.
- **Cursores consistentes**: `cursor-pointer` aplicado na base do componente `Button`
  e nos controles clicáveis (Select trigger, Switch, TabsTrigger, itens de dropdown),
  garantindo UX uniforme no Tailwind 4.
- **Segurança**: RLS em todas as tabelas (admin total via `private.is_admin()`),
  proteção de rota no `proxy.ts` e guarda de role no layout do dashboard.

## Roadmap

- [ ] Loja pública `(loja)` (catálogo, carrinho, checkout)
- [ ] Integração de pagamento (Mercado Pago)
- [ ] Frete (Melhor Envio)
- [ ] E-mails transacionais (Resend)
- [ ] Status "Enviado" / "Entregue" com rastreio automático (futura fase de frete)
