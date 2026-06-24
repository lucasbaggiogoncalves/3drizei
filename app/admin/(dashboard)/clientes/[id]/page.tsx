import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, MapPin, Phone, ScrollText } from "lucide-react";
import { getCliente, type Endereco } from "@/lib/data/clientes";
import { formatBRL, formatDate, formatPedidoNumero } from "@/lib/format";
import { PageHeader } from "@/components/admin/page-header";
import { ClienteFormDialog } from "@/components/admin/cliente-form-dialog";
import { ClienteDeleteButton } from "@/components/admin/cliente-delete-button";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = { title: "Cliente · 3drizei" };

function enderecoLinha(e: Endereco | null): string | null {
  if (!e) return null;
  const partes = [
    [e.logradouro, e.numero].filter(Boolean).join(", "),
    e.complemento,
    e.bairro,
    [e.cidade, e.uf].filter(Boolean).join(" / "),
    e.cep,
  ].filter(Boolean);
  return partes.length ? partes.join(" · ") : null;
}

export default async function ClienteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getCliente(id);
  if (!data) notFound();

  const { cliente, pedidos } = data;
  const endereco = enderecoLinha(cliente.endereco as Endereco | null);
  const totalGasto = pedidos.reduce((s, p) => s + p.total_centavos, 0);

  return (
    <>
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="-ml-2 w-fit rounded-full text-clay-600"
      >
        <Link href="/admin/clientes">
          <ArrowLeft className="size-4" />
          Clientes
        </Link>
      </Button>

      <PageHeader eyebrow="Cliente" title={cliente.nome}>
        <ClienteFormDialog
          cliente={cliente}
          trigger={<Button variant="secondary" className="rounded-full">Editar</Button>}
        />
        <ClienteDeleteButton id={cliente.id} nome={cliente.nome} />
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Ficha</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 text-clay-400" />
              <span className="text-clay-700">{cliente.email || "—"}</span>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 text-clay-400" />
              <span className="text-clay-700">{cliente.telefone || "—"}</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 text-clay-400" />
              <span className="text-clay-700">{endereco || "Sem endereço"}</span>
            </div>
            {cliente.notas ? (
              <div className="flex items-start gap-3">
                <ScrollText className="mt-0.5 size-4 text-clay-400" />
                <span className="whitespace-pre-line text-clay-700">{cliente.notas}</span>
              </div>
            ) : null}
            <div className="border-t border-border/70 pt-3">
              <p className="eyebrow">Total gasto</p>
              <p className="font-heading text-xl font-semibold text-terracotta-700">
                {formatBRL(totalGasto)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Histórico de pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            {pedidos.length === 0 ? (
              <p className="py-8 text-center text-sm text-clay-500">
                Nenhum pedido ainda.
              </p>
            ) : (
              <ul className="divide-y divide-border/70">
                {pedidos.map((pedido) => (
                  <li key={pedido.id}>
                    <Link
                      href={`/admin/pedidos/${pedido.id}`}
                      className="flex items-center justify-between gap-3 py-3 transition hover:text-terracotta-700"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-clay-500">
                          {formatPedidoNumero(pedido.numero)}
                        </span>
                        <StatusBadge status={pedido.status} />
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-clay-500">
                          {formatDate(pedido.created_at)}
                        </span>
                        <span className="font-mono text-sm font-medium text-clay-800">
                          {formatBRL(pedido.total_centavos)}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
