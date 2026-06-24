-- 3drizei · lucro deixa de subtrair a mão de obra (tempo próprio não é despesa).
-- O preço sugerido segue cobrando a mão de obra; apenas o custo de caixa exclui.
-- Backfill: custo_unit_centavos passa a ser o custo SEM mão de obra.
-- O trigger recalc_pedido_totais recalcula custo_total_centavos e a coluna
-- gerada lucro_centavos se ajusta automaticamente.

update public.pedido_itens
set custo_unit_centavos = greatest(
  0,
  custo_unit_centavos - coalesce((breakdown_snapshot->>'maoObra')::int, 0)
)
where coalesce((breakdown_snapshot->>'maoObra')::int, 0) > 0;
