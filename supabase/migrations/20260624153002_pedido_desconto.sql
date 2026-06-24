-- 3drizei · desconto no pedido
-- subtotal = soma dos itens (trigger); total = subtotal - desconto (líquido);
-- lucro = subtotal - desconto - custo.

alter table public.pedidos drop column lucro_centavos;
alter table public.pedidos rename column total_centavos to subtotal_centavos;

alter table public.pedidos
  add column desconto_centavos integer not null default 0 check (desconto_centavos >= 0);

alter table public.pedidos
  add column total_centavos integer
  generated always as (subtotal_centavos - desconto_centavos) stored;

alter table public.pedidos
  add column lucro_centavos integer
  generated always as (subtotal_centavos - desconto_centavos - custo_total_centavos) stored;

-- Recalcula subtotal/custo a partir dos itens
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
    subtotal_centavos = coalesce((select sum(quantidade * preco_unit_centavos) from public.pedido_itens where pedido_id = pid), 0),
    custo_total_centavos = coalesce((select sum(quantidade * custo_unit_centavos) from public.pedido_itens where pedido_id = pid), 0)
  where p.id = pid;
  return null;
end;
$$;

revoke all on function public.recalc_pedido_totais() from public, anon, authenticated;
