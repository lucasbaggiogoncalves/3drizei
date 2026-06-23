import { z } from "zod";

/**
 * Motor de precificação — função pura, testável, fonte única da verdade.
 * Usado embutido no cadastro de variação e na calculadora avulsa.
 *
 * Modelo de custo:
 *   material + tempo de máquina + energia + buffer de falha
 *   + mão de obra de pós-processamento + consumíveis + embalagem
 *   -> margem -> taxas (gross-up).
 *
 * Tudo em centavos (integer). Nunca float em dinheiro persistido.
 */

export const pricingInputSchema = z.object({
  gramas: z.number().min(0).default(0),
  materialCustoPorKgCentavos: z.number().int().min(0).default(0),
  tempoImpressaoH: z.number().min(0).default(0),
  tempoPosH: z.number().min(0).default(0),
  consumiveisCentavos: z.number().int().min(0).default(0),
  embalagemCentavos: z.number().int().min(0).default(0),
});

export const pricingSettingsSchema = z.object({
  horaMaquinaCentavos: z.number().int().min(0),
  kwhCentavos: z.number().int().min(0),
  consumoW: z.number().int().min(0),
  bufferFalhaPct: z.number().min(0),
  maoObraHoraCentavos: z.number().int().min(0),
  margemPct: z.number().min(0),
  taxasPct: z.number().min(0).max(99.9),
});

export type PricingInput = z.infer<typeof pricingInputSchema>;
export type PricingSettings = z.infer<typeof pricingSettingsSchema>;

export type PricingBreakdown = {
  material: number;
  maquina: number;
  energia: number;
  falha: number;
  maoObra: number;
  consumiveis: number;
  embalagem: number;
  custoTotal: number;
  margem: number;
  taxas: number;
  precoSugerido: number;
  // parâmetros usados (para registro/snapshot)
  margemPct: number;
  taxasPct: number;
  bufferFalhaPct: number;
};

const round = Math.round;

export function calcularPreco(
  input: PricingInput,
  settings: PricingSettings,
): PricingBreakdown {
  const material = round((input.gramas / 1000) * input.materialCustoPorKgCentavos);
  const maquina = round(input.tempoImpressaoH * settings.horaMaquinaCentavos);
  const energia = round(
    (settings.consumoW / 1000) * input.tempoImpressaoH * settings.kwhCentavos,
  );

  const producao = material + maquina + energia;
  const falha = round((producao * settings.bufferFalhaPct) / 100);
  const maoObra = round(input.tempoPosH * settings.maoObraHoraCentavos);
  const consumiveis = round(input.consumiveisCentavos);
  const embalagem = round(input.embalagemCentavos);

  const custoTotal =
    material + maquina + energia + falha + maoObra + consumiveis + embalagem;

  const precoComMargem = custoTotal * (1 + settings.margemPct / 100);

  // Gross-up das taxas: o cliente paga o suficiente para que, após a taxa,
  // a margem desejada seja preservada.
  const fator = settings.taxasPct > 0 ? 1 - settings.taxasPct / 100 : 1;
  const precoFinal = fator > 0 ? precoComMargem / fator : precoComMargem;

  const precoComMargemInt = round(precoComMargem);
  const precoSugerido = round(precoFinal);

  return {
    material,
    maquina,
    energia,
    falha,
    maoObra,
    consumiveis,
    embalagem,
    custoTotal,
    margem: precoComMargemInt - custoTotal,
    taxas: precoSugerido - precoComMargemInt,
    precoSugerido,
    margemPct: settings.margemPct,
    taxasPct: settings.taxasPct,
    bufferFalhaPct: settings.bufferFalhaPct,
  };
}

/** Linhas do breakdown para exibição (rótulo + valor em centavos). */
export const BREAKDOWN_LINHAS: { key: keyof PricingBreakdown; label: string }[] = [
  { key: "material", label: "Material (filamento)" },
  { key: "maquina", label: "Tempo de máquina" },
  { key: "energia", label: "Energia" },
  { key: "falha", label: "Buffer de falha" },
  { key: "maoObra", label: "Mão de obra (pós)" },
  { key: "consumiveis", label: "Consumíveis" },
  { key: "embalagem", label: "Embalagem" },
];
