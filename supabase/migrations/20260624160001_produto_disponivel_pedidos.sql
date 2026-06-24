-- 3drizei · separa visibilidade da loja de disponibilidade nos pedidos
-- ativo              → aparece na loja pública (front, futuro)
-- disponivel_pedidos → aparece no seletor de produtos ao criar/editar pedidos

alter table public.produtos
  add column disponivel_pedidos boolean not null default true;
