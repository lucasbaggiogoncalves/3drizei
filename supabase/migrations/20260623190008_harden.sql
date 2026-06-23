-- 3drizei · hardening (advisors)
-- 1) search_path fixo no helper de updated_at
-- 2) bucket publico nao precisa de SELECT amplo (listagem); restringe a admin

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop policy if exists "produtos_read" on storage.objects;

-- Imagens publicas continuam acessiveis pela URL publica do objeto.
-- Listagem/consulta via API fica restrita ao admin.
create policy "produtos_admin_select" on storage.objects
for select to authenticated
using (bucket_id = 'produtos' and private.is_admin());
