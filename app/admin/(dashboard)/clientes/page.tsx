import Link from "next/link";
import { Users } from "lucide-react";
import { getClientes } from "@/lib/data/clientes";
import { formatBRL } from "@/lib/format";
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState } from "@/components/admin/empty-state";
import { ClienteFormDialog } from "@/components/admin/cliente-form-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

export const metadata = { title: "Clientes · 3drizei" };

export default async function ClientesPage() {
  const itens = await getClientes();

  return (
    <>
      <PageHeader
        eyebrow="Catálogo"
        title="Clientes"
        description="Histórico de pedidos e contato."
      >
        <ClienteFormDialog goToDetail />
      </PageHeader>

      {itens.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Nenhum cliente ainda"
          description="Cadastre clientes manualmente ou eles chegam automaticamente pela loja."
        >
          <ClienteFormDialog goToDetail />
        </EmptyState>
      ) : (
        <Card className="overflow-hidden p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead className="text-center">Pedidos</TableHead>
                <TableHead className="text-right">Total gasto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {itens.map(({ cliente, pedidosCount, totalGasto }) => (
                <TableRow key={cliente.id} className="cursor-pointer">
                  <TableCell className="font-medium">
                    <Link
                      href={`/admin/clientes/${cliente.id}`}
                      className="hover:text-terracotta-700"
                    >
                      {cliente.nome}
                    </Link>
                  </TableCell>
                  <TableCell className="text-clay-600">
                    {cliente.email || cliente.telefone || "—"}
                  </TableCell>
                  <TableCell className="text-center text-clay-700">{pedidosCount}</TableCell>
                  <TableCell className="text-right font-mono text-clay-800">
                    {formatBRL(totalGasto)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </>
  );
}
