-- 3drizei · categorias de despesa (referenciadas, não mais texto livre)

create table public.despesa_categorias (
  id uuid primary key default gen_random_uuid(),
  nome text not null unique,
  ativo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_despesa_categorias_updated_at
before update on public.despesa_categorias
for each row execute function public.set_updated_at();

alter table public.despesa_categorias enable row level security;

create policy "despesa_categorias_admin_all" on public.despesa_categorias
for all to authenticated
using (private.is_admin()) with check (private.is_admin());

insert into public.despesa_categorias (nome) values
  ('Filamento'),
  ('Energia'),
  ('Embalagem'),
  ('Manutenção'),
  ('Marketing'),
  ('Refugo/Perda'),
  ('Taxas'),
  ('Ferramentas');

-- despesas: categoria_id (FK, obrigatório). on delete restrict = bloqueia excluir em uso.
alter table public.despesas
  add column categoria_id uuid references public.despesa_categorias (id) on delete restrict;

alter table public.despesas alter column categoria_id set not null;

drop index if exists public.idx_despesas_categoria;
alter table public.despesas drop column categoria;
create index idx_despesas_categoria on public.despesas (categoria_id);
