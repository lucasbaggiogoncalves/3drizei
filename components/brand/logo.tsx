import { cn } from "@/lib/utils";

/**
 * Brand wordmark. The original logo art was not shipped with the design
 * system, so this is a faithful type-based interpretation: rounded Fredoka
 * wordmark with the terracotta "3d" and ink "rizei", per the brand readme.
 */
export function Logo({
  className,
  withDescriptor = false,
}: {
  className?: string;
  withDescriptor?: boolean;
}) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        className="font-heading font-bold tracking-tight"
        style={{ fontSize: "1.35rem" }}
      >
        <span className="text-terracotta-500">3d</span>
        <span className="text-clay-950">rizei</span>
      </span>
      {withDescriptor ? (
        <span className="eyebrow mt-1">Decoração | Presentes</span>
      ) : null}
    </span>
  );
}

/** Compact square badge — used in the collapsed sidebar and avatars. */
export function LogoBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-gradient-warm font-heading font-bold text-white shadow-warm-sm",
        className,
      )}
      style={{ width: "2.25rem", height: "2.25rem", fontSize: "0.95rem" }}
      aria-hidden
    >
      3d
    </span>
  );
}
