import { statusMeta, type PedidoStatus } from "@/lib/pedido-status";
import { cn } from "@/lib/utils";

export function StatusBadge({
  status,
  className,
}: {
  status: PedidoStatus;
  className?: string;
}) {
  const meta = statusMeta(status);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        meta.tint,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", meta.dot)} />
      {meta.label}
    </span>
  );
}
