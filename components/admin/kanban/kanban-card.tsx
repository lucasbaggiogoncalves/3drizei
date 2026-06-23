"use client";

import { useRouter } from "next/navigation";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, User } from "lucide-react";
import type { KanbanPedido } from "@/lib/data/pedidos";
import { formatBRL, formatPedidoNumero } from "@/lib/format";
import { cn } from "@/lib/utils";

export function KanbanCard({
  pedido,
  overlay = false,
}: {
  pedido: KanbanPedido;
  overlay?: boolean;
}) {
  const router = useRouter();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: pedido.id, data: { status: pedido.status } });

  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group rounded-xl border border-border/70 bg-card p-3 shadow-warm-sm transition",
        isDragging && !overlay && "opacity-40",
        overlay && "rotate-2 shadow-warm-lg",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <button
          type="button"
          onClick={() => router.push(`/admin/pedidos/${pedido.id}`)}
          className="text-left"
        >
          <span className="font-mono text-xs text-clay-500">
            {formatPedidoNumero(pedido.numero)}
          </span>
          <p className="flex items-center gap-1.5 font-medium text-clay-900">
            <User className="size-3.5 text-clay-400" />
            {pedido.clienteNome ?? "Sem cliente"}
          </p>
        </button>
        <button
          type="button"
          className="cursor-grab touch-none text-clay-300 opacity-0 transition group-hover:opacity-100 active:cursor-grabbing"
          {...attributes}
          {...listeners}
          aria-label="Mover pedido"
        >
          <GripVertical className="size-4" />
        </button>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs">
        <span className="text-clay-500">
          {pedido.itensCount} {pedido.itensCount === 1 ? "item" : "itens"}
        </span>
        <span className="font-mono font-medium text-clay-800">
          {formatBRL(pedido.totalCentavos)}
        </span>
      </div>
    </div>
  );
}
