-- 3drizei · pedidos (kanban), itens (com snapshot), historico de estagio, pagamentos

-- Estagios reais de producao (9) + cancelado
create type public.pedido_status as enum (
  'orcamento',
  'aprovado_sinal',
  'modelagem',
  'previa_enviada',
  'aprovado_impressao',
  'imprimindo',
  'pos_processamento',
  'pronto_saldo',
  'enviado',
  'cancelado'
);

-- Numero legivel sequencial (#0001)
create sequence if not exists public.pedido_numero_seq start 1;

create table public.pedidos (
  id uuid primary key default gen_random_uuid(),
  numero integer not null unique default nextval('public.pedido_numero_seq'),
  cliente_id uuid references public.clientes (id) on delete set null,
  status public.pedido_status not null default 'orcamento',
  total_centavos integer not null default 0,
  custo_total_centavos integer not null default 0,
  lucro_centavos integer generated always as (total_centavos - custo_total_centavos) stored,
  observacoes text,
  ordem numeric not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_pedidos_status on public.pedidos (status);
create index idx_pedidos_cliente on public.pedidos (cliente_id);

create trigger trg_pedidos_updated_at
before update on public.pedidos
for each row execute function public.set_updated_at();

alter table public.pedidos enable row level security;

create policy "pedidos_admin_all" on public.pedidos
for all to authenticated
using (private.is_admin()) with check (private.is_admin());

-- ============================================================
-- itens do pedido (snapshot de preco/custo/personalizacao)
-- ============================================================
create table public.pedido_itens (
  id uuid primary key default gen_random_uuid(),
  pedido_id uuid not null references public.pedidos (id) on delete cascade,
  produto_id uuid references public.produtos (id) on delete set null,
  variacao_id uuid references public.produto_variacoes (id) on delete set null,
  descricao text not null,
  quantidade integer not null default 1 check (quantidade > 0),
  preco_unit_centavos integer not null default 0 check (preco_unit_centavos >= 0),
  custo_unit_centavos integer not null default 0 check (custo_unit_centavos >= 0),
  breakdown_snapshot jsonb not null default '{}'::jsonb,
  personalizacao_respostas jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index idx_pedido_itens_pedido on public.pedido_itens (pedido_id);

alter table public.pedido_itens enable row level security;

create policy "pedido_itens_admin_all" on public.pedido_itens
for all to authenticated
using (private.is_admin()) with check (private.is_admin());

-- Recalcula totais do pedido sempre que itens mudam
create or replace function public.recalc_pedido_totais()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  pid uuid;
begin
  pid := coalesce(new.pedido_id, old.pedido_id);
  update public.pedidos p set
    total_centavos = coalesce((select sum(quantidade * preco_unit_centavos) from public.pedido_itens where pedido_id = pid), 0),
    custo_total_centavos = coalesce((select sum(quantidade * custo_unit_centavos) from public.pedido_itens where pedido_id = pid), 0)
  where p.id = pid;
  return null;
end;
$$;

revoke all on function public.recalc_pedido_totais() from public, anon, authenticated;

create trigger trg_recalc_pedido_totais
after insert or update or delete on public.pedido_itens
for each row execute function public.recalc_pedido_totais();

-- ============================================================
-- historico de estagio (timeline)
-- ============================================================
create table public.pedido_historico (
  id uuid primary key default gen_random_uuid(),
  pedido_id uuid not null references public.pedidos (id) on delete cascade,
  de_status public.pedido_status,
  para_status public.pedido_status not null,
  por uuid references auth.users (id) on delete set null,
  em timestamptz not null default now()
);

create index idx_pedido_historico_pedido on public.pedido_historico (pedido_id);

alter table public.pedido_historico enable row level security;

create policy "pedido_historico_admin_all" on public.pedido_historico
for all to authenticated
using (private.is_admin()) with check (private.is_admin());

create or replace function public.log_pedido_status()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (tg_op = 'INSERT') then
    insert into public.pedido_historico (pedido_id, de_status, para_status, por)
    values (new.id, null, new.status, (select auth.uid()));
  elsif (new.status is distinct from old.status) then
    insert into public.pedido_historico (pedido_id, de_status, para_status, por)
    values (new.id, old.status, new.status, (select auth.uid()));
  end if;
  return new;
end;
$$;

revoke all on function public.log_pedido_status() from public, anon, authenticated;

create trigger trg_log_pedido_status
after insert or update on public.pedidos
for each row execute function public.log_pedido_status();

-- ============================================================
-- pagamentos (integral; estrutura pronta p/ webhook futuro)
-- ============================================================
create table public.pagamentos (
  id uuid primary key default gen_random_uuid(),
  pedido_id uuid not null references public.pedidos (id) on delete cascade,
  valor_centavos integer not null check (valor_centavos >= 0),
  status text not null default 'pendente' check (status in ('pendente', 'pago', 'estornado', 'falhou')),
  provider text not null default 'manual',
  provider_id text,
  raw jsonb,
  pago_em timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_pagamentos_pedido on public.pagamentos (pedido_id);

create trigger trg_pagamentos_updated_at
before update on public.pagamentos
for each row execute function public.set_updated_at();

alter table public.pagamentos enable row level security;

create policy "pagamentos_admin_all" on public.pagamentos
for all to authenticated
using (private.is_admin()) with check (private.is_admin());
