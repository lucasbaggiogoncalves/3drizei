"use client";

import { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchKanban, movePedido } from "@/app/admin/(dashboard)/pedidos/actions";
import { KANBAN_COLUMNS, type PedidoStatus } from "@/lib/pedido-status";
import type { KanbanPedido } from "@/lib/data/pedidos";
import { KanbanColumn } from "@/components/admin/kanban/kanban-column";
import { KanbanCard } from "@/components/admin/kanban/kanban-card";

const QK = ["kanban"];

export function KanbanBoard({ initialData }: { initialData: KanbanPedido[] }) {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: QK,
    queryFn: fetchKanban,
    initialData,
  });
  const pedidos = useMemo(() => data ?? [], [data]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const porStatus = useMemo(() => {
    const map = new Map<PedidoStatus, KanbanPedido[]>();
    for (const col of KANBAN_COLUMNS) map.set(col.value, []);
    for (const p of pedidos) {
      if (p.status === "cancelado") continue;
      map.get(p.status)?.push(p);
    }
    return map;
  }, [pedidos]);

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: PedidoStatus }) =>
      movePedido(id, status),
    onError: () => {
      toast.error("Não consegui mover o pedido.");
      qc.invalidateQueries({ queryKey: QK });
    },
    onSuccess: (res) => {
      if (res?.error) {
        toast.error(res.error);
        qc.invalidateQueries({ queryKey: QK });
      }
    },
  });

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;
    const novoStatus = over.id as PedidoStatus;
    const atual = active.data.current?.status as PedidoStatus | undefined;
    if (!novoStatus || novoStatus === atual) return;

    qc.setQueryData<KanbanPedido[]>(QK, (old) =>
      (old ?? []).map((p) =>
        p.id === active.id ? { ...p, status: novoStatus } : p,
      ),
    );
    mutation.mutate({ id: String(active.id), status: novoStatus });
  }

  const activePedido = pedidos.find((p) => p.id === activeId) ?? null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={(e: DragStartEvent) => setActiveId(String(e.active.id))}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {KANBAN_COLUMNS.map((col) => (
          <KanbanColumn
            key={col.value}
            status={col.value}
            pedidos={porStatus.get(col.value) ?? []}
          />
        ))}
      </div>
      <DragOverlay>
        {activePedido ? <KanbanCard pedido={activePedido} overlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}
