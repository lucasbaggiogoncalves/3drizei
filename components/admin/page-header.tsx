export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="font-heading text-2xl font-semibold text-clay-950 sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-clay-600">{description}</p>
        ) : null}
      </div>
      {children ? <div className="flex items-center gap-2">{children}</div> : null}
    </div>
  );
}
