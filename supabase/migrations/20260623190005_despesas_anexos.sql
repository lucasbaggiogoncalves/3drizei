-- 3drizei · despesas (lucro real) + anexos (Storage)

create table public.despesas (
  id uuid primary key default gen_random_uuid(),
  categoria text not null,
  tipo text not null check (tipo in ('recorrente', 'variavel')),
  valor_centavos integer not null check (valor_centavos >= 0),
  pedido_id uuid references public.pedidos (id) on delete set null,
  descricao text,
  data date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_despesas_data on public.despesas (data);
create index idx_despesas_categoria on public.despesas (categoria);
create index idx_despesas_pedido on public.despesas (pedido_id);

create trigger trg_despesas_updated_at
before update on public.despesas
for each row execute function public.set_updated_at();

alter table public.despesas enable row level security;

create policy "despesas_admin_all" on public.despesas
for all to authenticated
using (private.is_admin()) with check (private.is_admin());

-- ============================================================
-- anexos: fotos de produto (bucket publico) e referencias do
-- cliente (bucket privado). Aponta para o path no Storage.
-- ============================================================
create table public.anexos (
  id uuid primary key default gen_random_uuid(),
  pedido_id uuid references public.pedidos (id) on delete cascade,
  cliente_id uuid references public.clientes (id) on delete cascade,
  bucket text not null default 'referencias',
  storage_path text not null,
  nome text,
  tipo text,
  created_at timestamptz not null default now()
);

create index idx_anexos_pedido on public.anexos (pedido_id);
create index idx_anexos_cliente on public.anexos (cliente_id);

alter table public.anexos enable row level security;

create policy "anexos_admin_all" on public.anexos
for all to authenticated
using (private.is_admin()) with check (private.is_admin());
