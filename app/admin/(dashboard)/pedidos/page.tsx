import Link from "next/link";
import { Plus } from "lucide-react";
import { getKanbanPedidos } from "@/lib/data/pedidos";
import { PageHeader } from "@/components/admin/page-header";
import { KanbanBoard } from "@/components/admin/kanban/kanban-board";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Pedidos · 3drizei" };

export default async function PedidosPage() {
  const pedidos = await getKanbanPedidos();

  return (
    <>
      <PageHeader
        eyebrow="Operação"
        title="Pedidos"
        description="Arraste os cards entre os estágios de produção. Cada movimento fica no histórico."
      >
        <Button asChild className="rounded-full">
          <Link href="/admin/pedidos/novo">
            <Plus className="size-4" />
            Novo pedido
          </Link>
        </Button>
      </PageHeader>

      <KanbanBoard initialData={pedidos} />
    </>
  );
}
