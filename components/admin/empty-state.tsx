import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="layerlines flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-clay-50/60 px-6 py-16 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-terracotta-50 text-terracotta-600">
        <Icon className="size-6" />
      </span>
      <div className="space-y-1">
        <h3 className="font-heading text-lg font-semibold text-clay-900">{title}</h3>
        {description ? (
          <p className="mx-auto max-w-sm text-sm text-clay-600">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}
