import Link from "next/link";
import { Plus } from "lucide-react";
import { getKanbanPedidos, getPedidosConcluidos } from "@/lib/data/pedidos";
import { formatBRL, formatDate, formatPedidoNumero } from "@/lib/format";
import { PageHeader } from "@/components/admin/page-header";
import { KanbanBoard } from "@/components/admin/kanban/kanban-board";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata = { title: "Pedidos · 3drizei" };

export default async function PedidosPage() {
  const [pedidos, concluidos] = await Promise.all([
    getKanbanPedidos(),
    getPedidosConcluidos(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Operação"
        title="Pedidos"
        description="Arraste os cards entre os estágios de produção. Pedidos concluídos saem do board."
      >
        <Button asChild className="rounded-full">
          <Link href="/admin/pedidos/novo">
            <Plus className="size-4" />
            Novo pedido
          </Link>
        </Button>
      </PageHeader>

      <Tabs defaultValue="producao">
        <TabsList>
          <TabsTrigger value="producao">Em produção</TabsTrigger>
          <TabsTrigger value="concluidos">Concluídos ({concluidos.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="producao" className="mt-4">
          <KanbanBoard initialData={pedidos} />
        </TabsContent>

        <TabsContent value="concluidos" className="mt-4">
          {concluidos.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border bg-clay-50/50 p-8 text-center text-sm text-clay-500">
              Nenhum pedido concluído ainda.
            </p>
          ) : (
            <Card className="overflow-hidden p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pedido</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Lucro</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {concluidos.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>
                        <Link
                          href={`/admin/pedidos/${p.id}`}
                          className="font-mono hover:text-terracotta-700"
                        >
                          {formatPedidoNumero(p.numero)}
                        </Link>
                      </TableCell>
                      <TableCell className="text-clay-700">
                        {p.clienteNome ?? "Sem cliente"}
                      </TableCell>
                      <TableCell className="text-clay-600">
                        {formatDate(p.createdAt)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-clay-800">
                        {formatBRL(p.totalCentavos)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-success-700">
                        {formatBRL(p.lucroCentavos)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
