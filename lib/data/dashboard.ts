import { createClient } from "@/lib/supabase/server";
import { KANBAN_COLUMNS, type PedidoStatus } from "@/lib/pedido-status";

export type DashboardData = {
  faturamento: number;
  lucroReal: number;
  ticketMedio: number;
  pedidosConfirmados: number;
  totalDespesas: number;
  emAberto: number;
  porEstagio: { status: PedidoStatus; count: number; total: number }[];
};

// Todos os estágios contam como venda confirmada (não há mais orçamento).
const CONFIRMADOS = new Set<PedidoStatus>([
  "aprovado",
  "modelagem",
  "em_fabricacao",
]);

export async function getDashboard(): Promise<DashboardData> {
  const supabase = await createClient();

  const [{ data: pedidos }, { data: despesas }] = await Promise.all([
    supabase
      .from("pedidos")
      .select("id, status, total_centavos, lucro_centavos"),
    supabase.from("despesas").select("valor_centavos, pedido_id"),
  ]);

  const lista = pedidos ?? [];
  const confirmados = lista.filter((p) =>
    CONFIRMADOS.has(p.status as PedidoStatus),
  );
  const idsConfirmados = new Set(confirmados.map((p) => p.id));

  const faturamento = confirmados.reduce((s, p) => s + p.total_centavos, 0);
  const lucroBruto = confirmados.reduce((s, p) => s + (p.lucro_centavos ?? 0), 0);

  const despesasVinculadas = (despesas ?? [])
    .filter((d) => d.pedido_id && idsConfirmados.has(d.pedido_id))
    .reduce((s, d) => s + d.valor_centavos, 0);

  const totalDespesas = (despesas ?? []).reduce((s, d) => s + d.valor_centavos, 0);

  const lucroReal = lucroBruto - despesasVinculadas;
  const ticketMedio = confirmados.length
    ? Math.round(faturamento / confirmados.length)
    : 0;

  const emAberto = lista.filter((p) => p.status === "em_fabricacao").length;

  const porEstagio = KANBAN_COLUMNS.map((col) => {
    const doEstagio = lista.filter((p) => p.status === col.value);
    return {
      status: col.value,
      count: doEstagio.length,
      total: doEstagio.reduce((s, p) => s + p.total_centavos, 0),
    };
  });

  return {
    faturamento,
    lucroReal,
    ticketMedio,
    pedidosConfirmados: confirmados.length,
    totalDespesas,
    emAberto,
    porEstagio,
  };
}
