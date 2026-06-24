import Link from "next/link";
import {
  ArrowRight,
  Coins,
  Receipt,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { getDashboard } from "@/lib/data/dashboard";
import { statusMeta } from "@/lib/pedido-status";
import { formatBRL } from "@/lib/format";
import { PageHeader } from "@/components/admin/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = { title: "Dashboard · 3drizei" };

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tint,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: typeof Coins;
  tint: string;
}) {
  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-3 pt-6">
        <div className="space-y-1">
          <p className="eyebrow">{label}</p>
          <p className="font-heading text-2xl font-semibold text-clay-900">{value}</p>
          {hint ? <p className="text-xs text-clay-500">{hint}</p> : null}
        </div>
        <span className={cn("grid size-10 place-items-center rounded-xl", tint)}>
          <Icon className="size-5" />
        </span>
      </CardContent>
    </Card>
  );
}

export default async function DashboardPage() {
  const d = await getDashboard();
  const maxCount = Math.max(1, ...d.porEstagio.map((e) => e.count));

  return (
    <>
      <PageHeader
        eyebrow="Atelier"
        title="Visão geral"
        description="Como anda o ateliê — receita confirmada, lucro real e produção em andamento."
      >
        <Button asChild className="rounded-full">
          <Link href="/admin/pedidos">
            Ver pedidos
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Faturamento"
          value={formatBRL(d.faturamento)}
          hint={`${d.pedidosConfirmados} pedido(s) confirmado(s)`}
          icon={Coins}
          tint="bg-terracotta-50 text-terracotta-600"
        />
        <StatCard
          label="Lucro real"
          value={formatBRL(d.lucroReal)}
          hint="Receita − custo − despesas do pedido"
          icon={TrendingUp}
          tint="bg-success-50 text-success-700"
        />
        <StatCard
          label="Ticket médio"
          value={formatBRL(d.ticketMedio)}
          icon={Wallet}
          tint="bg-copper-50 text-copper-700"
        />
        <StatCard
          label="Despesas totais"
          value={formatBRL(d.totalDespesas)}
          hint={`${d.emAberto} pedido(s) em fabricação`}
          icon={Receipt}
          tint="bg-clay-100 text-clay-700"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pedidos por estágio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {d.porEstagio.map((e) => {
            const meta = statusMeta(e.status);
            return (
              <div key={e.status} className="flex items-center gap-3">
                <span className="w-44 shrink-0 text-sm text-clay-700">{meta.label}</span>
                <div className="flex h-6 flex-1 items-center">
                  <div
                    className={cn("h-2.5 rounded-full", meta.dot)}
                    style={{ width: `${(e.count / maxCount) * 100}%`, minWidth: e.count ? "0.5rem" : 0 }}
                  />
                  <span className="ml-2 text-xs font-medium text-clay-600">{e.count}</span>
                </div>
                <span className="w-28 shrink-0 text-right font-mono text-xs text-clay-500">
                  {formatBRL(e.total)}
                </span>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </>
  );
}
