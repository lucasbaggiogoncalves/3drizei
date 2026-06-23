"use client";

import { useDroppable } from "@dnd-kit/core";
import type { KanbanPedido } from "@/lib/data/pedidos";
import { statusMeta, type PedidoStatus } from "@/lib/pedido-status";
import { formatBRL } from "@/lib/format";
import { cn } from "@/lib/utils";
import { KanbanCard } from "@/components/admin/kanban/kanban-card";

export function KanbanColumn({
  status,
  pedidos,
}: {
  status: PedidoStatus;
  pedidos: KanbanPedido[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const meta = statusMeta(status);
  const total = pedidos.reduce((s, p) => s + p.totalCentavos, 0);

  return (
    <div className="flex w-72 shrink-0 flex-col">
      <div className="mb-2 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className={cn("size-2 rounded-full", meta.dot)} />
          <h3 className="text-sm font-semibold text-clay-800">{meta.label}</h3>
          <span className="rounded-full bg-clay-100 px-1.5 text-xs text-clay-600">
            {pedidos.length}
          </span>
        </div>
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          "flex flex-1 flex-col gap-2 rounded-2xl border border-dashed border-transparent bg-clay-50/60 p-2 transition",
          isOver && "border-terracotta-300 bg-terracotta-50/60",
        )}
      >
        {pedidos.map((pedido) => (
          <KanbanCard key={pedido.id} pedido={pedido} />
        ))}
        {pedidos.length === 0 ? (
          <p className="px-2 py-6 text-center text-xs text-clay-400">Vazio</p>
        ) : null}
      </div>
      {pedidos.length > 0 ? (
        <p className="mt-2 px-1 text-right text-xs text-clay-500">
          {formatBRL(total)}
        </p>
      ) : null}
    </div>
  );
}
