-- 3drizei · defaults editaveis (energia, mao de obra, margem) + materiais base
-- Valores em centavos. Ajuste pela tela de Configuracoes.

insert into public.pricing_settings (
  versao, hora_maquina_centavos, kwh_centavos, consumo_w,
  buffer_falha_pct, mao_obra_hora_centavos, margem_pct, taxas_pct,
  embalagem_padrao_centavos, vigente
)
values (1, 0, 95, 150, 10, 2000, 60, 5, 0, true)
on conflict (versao) do nothing;

insert into public.materiais (nome, custo_por_kg_centavos)
select 'PLA', 12000
where not exists (select 1 from public.materiais where nome = 'PLA');

insert into public.materiais (nome, custo_por_kg_centavos)
select 'PETG', 14000
where not exists (select 1 from public.materiais where nome = 'PETG');
