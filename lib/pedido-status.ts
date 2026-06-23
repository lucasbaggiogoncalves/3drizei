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
 * Os 9 estágios reais de produção (na ordem do fluxo) + cancelado.
 * O kanban exibe os 9 estágios; cancelado é tratado à parte.
 */
export const PEDIDO_STATUS: StatusMeta[] = [
  { value: "orcamento", label: "Orçamento", tint: "bg-clay-100 text-clay-700", dot: "bg-clay-400" },
  { value: "aprovado_sinal", label: "Aprovado / Sinal", tint: "bg-copper-50 text-copper-700", dot: "bg-copper-400" },
  { value: "modelagem", label: "Modelagem", tint: "bg-info-50 text-info-700", dot: "bg-info-500" },
  { value: "previa_enviada", label: "Prévia enviada", tint: "bg-info-50 text-info-700", dot: "bg-info-500" },
  { value: "aprovado_impressao", label: "Aprovado p/ impressão", tint: "bg-terracotta-50 text-terracotta-700", dot: "bg-terracotta-400" },
  { value: "imprimindo", label: "Imprimindo", tint: "bg-terracotta-50 text-terracotta-700", dot: "bg-terracotta-500" },
  { value: "pos_processamento", label: "Pós-processamento", tint: "bg-warning-50 text-warning-700", dot: "bg-warning-500" },
  { value: "pronto_saldo", label: "Pronto / Saldo", tint: "bg-success-50 text-success-700", dot: "bg-success-500" },
  { value: "enviado", label: "Enviado", tint: "bg-success-50 text-success-700", dot: "bg-success-700" },
  { value: "cancelado", label: "Cancelado", tint: "bg-danger-50 text-danger-700", dot: "bg-danger-500" },
];

/** Colunas do kanban (sem cancelado). */
export const KANBAN_COLUMNS: StatusMeta[] = PEDIDO_STATUS.filter(
  (s) => s.value !== "cancelado",
);

const byValue = new Map(PEDIDO_STATUS.map((s) => [s.value, s]));

export function statusMeta(value: PedidoStatus): StatusMeta {
  return byValue.get(value) ?? PEDIDO_STATUS[0];
}

export function statusLabel(value: PedidoStatus): string {
  return statusMeta(value).label;
}
