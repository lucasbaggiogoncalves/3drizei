import Link from "next/link";
import { Receipt } from "lucide-react";
import { getDespesas } from "@/lib/data/despesas";
import { getPedidosSimple } from "@/lib/data/pedidos";
import { formatBRL, formatDate, formatPedidoNumero } from "@/lib/format";
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState } from "@/components/admin/empty-state";
import { DespesaFormDialog } from "@/components/admin/despesa-form-dialog";
import { DespesaActions } from "@/components/admin/despesa-actions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata = { title: "Despesas · 3drizei" };

export default async function DespesasPage() {
  const [despesas, pedidos] = await Promise.all([
    getDespesas(),
    getPedidosSimple(),
  ]);

  const totalGeral = despesas.reduce((s, d) => s + d.valor_centavos, 0);
  const totalRecorrente = despesas
    .filter((d) => d.tipo === "recorrente")
    .reduce((s, d) => s + d.valor_centavos, 0);
  const totalVariavel = totalGeral - totalRecorrente;

  return (
    <>
      <PageHeader
        eyebrow="Financeiro"
        title="Despesas"
        description="Custos recorrentes e variáveis. Vincule ao pedido para apurar o lucro real."
      >
        <DespesaFormDialog pedidos={pedidos} />
      </PageHeader>

      {despesas.length === 0 ? (
        <EmptyState
          icon={Receipt}
          title="Nenhuma despesa lançada"
          description="Registre seus custos para enxergar o lucro real de cada pedido."
        >
          <DespesaFormDialog pedidos={pedidos} />
        </EmptyState>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-clay-600">Total</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-heading text-2xl font-semibold text-clay-900">
                  {formatBRL(totalGeral)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-clay-600">Recorrentes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-heading text-2xl font-semibold text-copper-700">
                  {formatBRL(totalRecorrente)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-clay-600">Variáveis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-heading text-2xl font-semibold text-terracotta-700">
                  {formatBRL(totalVariavel)}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="overflow-hidden p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Pedido</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="w-24" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {despesas.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="text-clay-600">{formatDate(d.data)}</TableCell>
                    <TableCell>
                      <span className="font-medium text-clay-900">{d.categoria}</span>
                      {d.descricao ? (
                        <span className="block text-xs text-clay-500">{d.descricao}</span>
                      ) : null}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          d.tipo === "recorrente"
                            ? "bg-copper-50 text-copper-700"
                            : "bg-clay-100 text-clay-700"
                        }
                      >
                        {d.tipo === "recorrente" ? "Recorrente" : "Variável"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-clay-600">
                      {d.pedidoNumero !== null ? (
                        <Link
                          href={`/admin/pedidos/${d.pedido_id}`}
                          className="font-mono hover:text-terracotta-700"
                        >
                          {formatPedidoNumero(d.pedidoNumero)}
                        </Link>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell className="text-right font-mono text-clay-800">
                      {formatBRL(d.valor_centavos)}
                    </TableCell>
                    <TableCell>
                      <DespesaActions despesa={d} pedidos={pedidos} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </>
      )}
    </>
  );
}
