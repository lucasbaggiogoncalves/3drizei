-- 3drizei · Storage buckets
-- produtos: fotos publicas | referencias: fotos do cliente, privadas

insert into storage.buckets (id, name, public)
values ('produtos', 'produtos', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('referencias', 'referencias', false)
on conflict (id) do nothing;

-- Bucket produtos: leitura publica, escrita/gestao apenas admin
create policy "produtos_read" on storage.objects
for select to anon, authenticated
using (bucket_id = 'produtos');

create policy "produtos_admin_insert" on storage.objects
for insert to authenticated
with check (bucket_id = 'produtos' and private.is_admin());

create policy "produtos_admin_update" on storage.objects
for update to authenticated
using (bucket_id = 'produtos' and private.is_admin())
with check (bucket_id = 'produtos' and private.is_admin());

create policy "produtos_admin_delete" on storage.objects
for delete to authenticated
using (bucket_id = 'produtos' and private.is_admin());

-- Bucket referencias: privado, admin full (INSERT+SELECT+UPDATE+DELETE p/ upsert)
create policy "referencias_admin_all" on storage.objects
for all to authenticated
using (bucket_id = 'referencias' and private.is_admin())
with check (bucket_id = 'referencias' and private.is_admin());
