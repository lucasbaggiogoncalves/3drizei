-- 3drizei · clientes
-- Entidade de negocio. user_id opcional: cliente pode nascer da loja
-- (com conta) ou manual no admin (sem conta). Campos fiscais nullable.

create table public.clientes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  nome text not null,
  email text,
  telefone text,
  cpf_cnpj text,
  endereco jsonb,
  notas text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index uq_clientes_user on public.clientes (user_id) where user_id is not null;
create index idx_clientes_email on public.clientes (lower(email));
create index idx_clientes_nome on public.clientes (nome);

create trigger trg_clientes_updated_at
before update on public.clientes
for each row execute function public.set_updated_at();

alter table public.clientes enable row level security;

create policy "clientes_admin_all" on public.clientes
for all to authenticated
using (private.is_admin()) with check (private.is_admin());

-- Loja (fase 2): cliente le/edita o proprio cadastro
create policy "clientes_select_own" on public.clientes
for select to authenticated
using (user_id = (select auth.uid()));

create policy "clientes_update_own" on public.clientes
for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));
