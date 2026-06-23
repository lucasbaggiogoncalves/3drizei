-- 3drizei · core: schema privado, helpers, profiles + RLS
-- Dinheiro sempre em centavos (integer). updated_at via trigger.

create schema if not exists private;

-- Helper de updated_at (reutilizado por todas as tabelas)
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- profiles (1:1 com auth.users) — role admin|customer
-- ============================================================
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'customer' check (role in ('admin', 'customer')),
  nome text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;

-- Checagem de admin: SECURITY DEFINER em schema privado (nao exposto na API),
-- roda como owner e ignora RLS, evitando recursao nas policies de profiles.
create or replace function private.is_admin()
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = (select auth.uid()) and p.role = 'admin'
  );
$$;

revoke all on function private.is_admin() from public, anon, authenticated;
grant execute on function private.is_admin() to authenticated;

-- Cria profile automaticamente quando um usuario nasce no auth
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, nome, role)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'nome', new.email), 'customer');
  return new;
end;
$$;

revoke all on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Impede que um nao-admin altere a propria role (escalonamento de privilegio)
create or replace function public.protect_profile_role()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (new.role is distinct from old.role) and not private.is_admin() then
    raise exception 'Somente um admin pode alterar a role.';
  end if;
  return new;
end;
$$;

revoke all on function public.protect_profile_role() from public, anon, authenticated;

create trigger trg_protect_profile_role
before update on public.profiles
for each row execute function public.protect_profile_role();

-- RLS
create policy "profiles_select_self_or_admin" on public.profiles
for select to authenticated
using (id = (select auth.uid()) or private.is_admin());

create policy "profiles_update_self" on public.profiles
for update to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

create policy "profiles_admin_all" on public.profiles
for all to authenticated
using (private.is_admin())
with check (private.is_admin());
