import type { Database } from "@/lib/database.types";

export type PedidoStatus = Database["public"]["Enums"]["pedido_status"];

type StatusMeta = {
  value: PedidoStatus;
  label: string;
  /** Cor de destaque (token de cor do tema). */
  tint: string;
  dot: string;
};

/**
 * Os 3 estágios de produção (na ordem do fluxo) + "concluído" (terminal).
 * O kanban exibe só os de produção; concluído sai do board.
 */
export const PEDIDO_STATUS: StatusMeta[] = [
  { value: "aprovado", label: "Aprovado", tint: "bg-info-50 text-info-700", dot: "bg-info-500" },
  { value: "modelagem", label: "Modelagem", tint: "bg-copper-50 text-copper-700", dot: "bg-copper-400" },
  { value: "em_fabricacao", label: "Em fabricação", tint: "bg-terracotta-50 text-terracotta-700", dot: "bg-terracotta-500" },
  { value: "concluido", label: "Concluído", tint: "bg-success-50 text-success-700", dot: "bg-success-500" },
];

/** Colunas do kanban (sem o terminal "concluído"). */
export const KANBAN_COLUMNS: StatusMeta[] = PEDIDO_STATUS.filter(
  (s) => s.value !== "concluido",
);

const byValue = new Map(PEDIDO_STATUS.map((s) => [s.value, s]));

export function statusMeta(value: PedidoStatus): StatusMeta {
  return byValue.get(value) ?? PEDIDO_STATUS[0];
}

export function statusLabel(value: PedidoStatus): string {
  return statusMeta(value).label;
}
