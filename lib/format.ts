const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateFmt = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const dateTimeFmt = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

/** Formata centavos (integer) como R$ 1.234,56 */
export function formatBRL(centavos: number | null | undefined): string {
  return brl.format((centavos ?? 0) / 100);
}

/** Converte um valor em reais (number) para centavos (integer). */
export function reaisToCentavos(reais: number): number {
  return Math.round(reais * 100);
}

/** Converte centavos para reais (number) — útil em inputs. */
export function centavosToReais(centavos: number): number {
  return centavos / 100;
}

/**
 * Faz o parse de uma string digitada (ex: "1.234,56" ou "1234,56" ou "12.5")
 * para centavos. Aceita vírgula ou ponto como separador decimal.
 */
export function parseBRLToCentavos(input: string): number {
  if (!input) return 0;
  const cleaned = input
    .replace(/[^\d,.-]/g, "")
    .replace(/\.(?=\d{3}(\D|$))/g, "")
    .replace(",", ".");
  const value = Number.parseFloat(cleaned);
  return Number.isFinite(value) ? Math.round(value * 100) : 0;
}

export function formatDate(value: string | Date | null | undefined): string {
  if (!value) return "—";
  return dateFmt.format(new Date(value));
}

export function formatDateTime(value: string | Date | null | undefined): string {
  if (!value) return "—";
  return dateTimeFmt.format(new Date(value));
}

/** Número do pedido legível: 42 -> #0042 */
export function formatPedidoNumero(numero: number): string {
  return `#${String(numero).padStart(4, "0")}`;
}

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function formatPeso(gramas: number | null | undefined): string {
  const g = gramas ?? 0;
  if (g >= 1000) return `${(g / 1000).toLocaleString("pt-BR")} kg`;
  return `${g.toLocaleString("pt-BR")} g`;
}
