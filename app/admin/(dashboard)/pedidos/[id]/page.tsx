import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPedido } from "@/lib/data/pedidos";
import { getClientesSimple } from "@/lib/data/clientes";
import { getProdutosParaPedido } from "@/lib/data/produtos";
import { formatDateTime, formatPedidoNumero } from "@/lib/format";
import { statusMeta } from "@/lib/pedido-status";
import { PageHeader } from "@/components/admin/page-header";
import { PedidoForm } from "@/components/admin/pedido-form";
import { StatusBadge } from "@/components/admin/status-badge";
import { PedidoDeleteButton } from "@/components/admin/pedido-delete-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const metadata = { title: "Pedido · 3drizei" };

export default async function PedidoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [data, clientes, produtos] = await Promise.all([
    getPedido(id),
    getClientesSimple(),
    getProdutosParaPedido(),
  ]);
  if (!data) notFound();

  const numero = formatPedidoNumero(data.pedido.numero);

  return (
    <>
      <Button asChild variant="ghost" size="sm" className="-ml-2 w-fit rounded-full text-clay-600">
        <Link href="/admin/pedidos">
          <ArrowLeft className="size-4" />
          Pedidos
        </Link>
      </Button>

      <PageHeader eyebrow={`Pedido ${numero}`} title={data.pedido.clientes?.nome ?? "Sem cliente"}>
        <StatusBadge status={data.pedido.status} />
        <PedidoDeleteButton id={data.pedido.id} numero={numero} />
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PedidoForm clientes={clientes} produtos={produtos} pedido={data} />
        </div>

        <Card className="h-fit lg:sticky lg:top-20">
          <CardHeader>
            <CardTitle>Linha do tempo</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="relative space-y-4 border-l border-border/70 pl-4">
              {data.historico.map((h) => {
                const meta = statusMeta(h.para_status);
                return (
                  <li key={h.id} className="relative">
                    <span
                      className={cn(
                        "absolute -left-[1.30rem] top-1 size-2.5 rounded-full ring-2 ring-background",
                        meta.dot,
                      )}
                    />
                    <p className="text-sm font-medium text-clay-800">{meta.label}</p>
                    <p className="text-xs text-clay-500">{formatDateTime(h.em)}</p>
                  </li>
                );
              })}
              {data.historico.length === 0 ? (
                <li className="text-sm text-clay-500">Sem movimentações.</li>
              ) : null}
            </ol>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
