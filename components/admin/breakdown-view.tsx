import { BREAKDOWN_LINHAS, type PricingBreakdown } from "@/lib/pricing/engine";
import { formatBRL } from "@/lib/format";
import { cn } from "@/lib/utils";

export function BreakdownView({
  breakdown,
  className,
}: {
  breakdown: PricingBreakdown;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <dl className="divide-y divide-border/70">
        {BREAKDOWN_LINHAS.map((linha) => {
          const valor = breakdown[linha.key];
          if (!valor) return null;
          return (
            <div
              key={linha.key}
              className="flex items-center justify-between py-2 text-sm"
            >
              <dt className="text-clay-600">{linha.label}</dt>
              <dd className="font-mono text-clay-800">{formatBRL(valor)}</dd>
            </div>
          );
        })}
        <div className="flex items-center justify-between py-2 text-sm">
          <dt className="font-medium text-clay-700">Custo total</dt>
          <dd className="font-mono font-medium text-clay-900">
            {formatBRL(breakdown.custoTotal)}
          </dd>
        </div>
        <div className="flex items-center justify-between py-2 text-sm">
          <dt className="text-clay-600">
            Margem ({breakdown.margemPct.toLocaleString("pt-BR")}%)
          </dt>
          <dd className="font-mono text-success-700">+{formatBRL(breakdown.margem)}</dd>
        </div>
        {breakdown.taxas ? (
          <div className="flex items-center justify-between py-2 text-sm">
            <dt className="text-clay-600">
              Taxas ({breakdown.taxasPct.toLocaleString("pt-BR")}%)
            </dt>
            <dd className="font-mono text-clay-700">+{formatBRL(breakdown.taxas)}</dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-3 flex items-end justify-between rounded-xl bg-terracotta-50 px-4 py-3">
        <span className="eyebrow text-terracotta-700">Preço sugerido</span>
        <span className="font-heading text-2xl font-semibold text-terracotta-700">
          {formatBRL(breakdown.precoSugerido)}
        </span>
      </div>
    </div>
  );
}
