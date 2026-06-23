import { getClientesSimple } from "@/lib/data/clientes";
import { getProdutosParaPedido } from "@/lib/data/produtos";
import { PageHeader } from "@/components/admin/page-header";
import { PedidoForm } from "@/components/admin/pedido-form";

export const metadata = { title: "Novo pedido · 3drizei" };

export default async function NovoPedidoPage() {
  const [clientes, produtos] = await Promise.all([
    getClientesSimple(),
    getProdutosParaPedido(),
  ]);

  return (
    <>
      <PageHeader eyebrow="Pedido · Novo" title="Novo pedido" />
      <PedidoForm clientes={clientes} produtos={produtos} />
    </>
  );
}
