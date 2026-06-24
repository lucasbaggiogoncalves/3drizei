-- 3drizei · simplifica estágios para 3 (Aprovado > Modelagem > Em fabricação)
-- e remove o histórico de movimentações do kanban.

-- Remove histórico (trigger, função e tabela)
drop trigger if exists trg_log_pedido_status on public.pedidos;
drop function if exists public.log_pedido_status();
drop table if exists public.pedido_historico;

-- Novo enum com 3 estágios
create type public.pedido_status_v2 as enum ('aprovado', 'modelagem', 'em_fabricacao');

alter table public.pedidos alter column status drop default;

alter table public.pedidos
  alter column status type public.pedido_status_v2
  using (
    case status::text
      when 'modelagem' then 'modelagem'
      when 'aprovado_impressao' then 'em_fabricacao'
      when 'imprimindo' then 'em_fabricacao'
      when 'pos_processamento' then 'em_fabricacao'
      when 'pronto_saldo' then 'em_fabricacao'
      when 'enviado' then 'em_fabricacao'
      else 'aprovado'
    end
  )::public.pedido_status_v2;

drop type public.pedido_status;
alter type public.pedido_status_v2 rename to pedido_status;

alter table public.pedidos
  alter column status set default 'aprovado'::public.pedido_status;
