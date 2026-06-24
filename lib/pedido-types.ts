import type { PedidoStatus } from "@/lib/pedido-status";

export type PedidoItemTipo = "catalogo" | "zero";

export type PedidoItemInput = {
  id?: string;
  tipo: PedidoItemTipo;
  produtoId: string | null;
  variacaoId: string | null;
  descricao: string;
  quantidade: number;
  precoUnitCentavos: number;
  custoUnitCentavos: number;
  personalizacao: Record<string, unknown>;
};

export type PedidoPayload = {
  id?: string;
  clienteId: string | null;
  status: PedidoStatus;
  descontoCentavos: number;
  observacoes: string;
  itens: PedidoItemInput[];
};

export function novoItem(tipo: PedidoItemTipo): PedidoItemInput {
  return {
    tipo,
    produtoId: null,
    variacaoId: null,
    descricao: "",
    quantidade: 1,
    precoUnitCentavos: 0,
    custoUnitCentavos: 0,
    personalizacao: {},
  };
}
