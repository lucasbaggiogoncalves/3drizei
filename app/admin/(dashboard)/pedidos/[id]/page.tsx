import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPedido } from "@/lib/data/pedidos";
import { getClientesSimple } from "@/lib/data/clientes";
import { getProdutosParaPedido } from "@/lib/data/produtos";
import { formatPedidoNumero } from "@/lib/format";
import { PageHeader } from "@/components/admin/page-header";
import { PedidoForm } from "@/components/admin/pedido-form";
import { StatusBadge } from "@/components/admin/status-badge";
import { PedidoDeleteButton } from "@/components/admin/pedido-delete-button";
import { Button } from "@/components/ui/button";

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

      <PedidoForm clientes={clientes} produtos={produtos} pedido={data} />
    </>
  );
}
