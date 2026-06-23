import { describe, expect, it } from "vitest";
import { calcularPreco, type PricingSettings } from "./engine";

const settings: PricingSettings = {
  horaMaquinaCentavos: 100, // R$ 1,00 / h de máquina
  kwhCentavos: 95, // R$ 0,95 / kWh
  consumoW: 200, // 200 W
  bufferFalhaPct: 10,
  maoObraHoraCentavos: 2000, // R$ 20,00 / h
  margemPct: 60,
  taxasPct: 5,
};

describe("calcularPreco", () => {
  it("calcula o breakdown de um caso simples", () => {
    const r = calcularPreco(
      {
        gramas: 100,
        materialCustoPorKgCentavos: 12000, // R$ 120 / kg
        tempoImpressaoH: 5,
        tempoPosH: 1,
        consumiveisCentavos: 200,
        embalagemCentavos: 300,
      },
      settings,
    );

    // material = 100/1000 * 12000 = 1200
    expect(r.material).toBe(1200);
    // maquina = 5 * 100 = 500
    expect(r.maquina).toBe(500);
    // energia = 0.2 * 5 * 95 = 95
    expect(r.energia).toBe(95);
    // producao = 1795 -> falha 10% = 180 (179.5 arredonda)
    expect(r.falha).toBe(180);
    // maoObra = 1 * 2000 = 2000
    expect(r.maoObra).toBe(2000);
    expect(r.consumiveis).toBe(200);
    expect(r.embalagem).toBe(300);

    const custoTotal = 1200 + 500 + 95 + 180 + 2000 + 200 + 300;
    expect(r.custoTotal).toBe(custoTotal); // 4475

    // preco com margem 60% = 4475 * 1.6 = 7160
    expect(r.custoTotal + r.margem).toBe(7160);

    // gross-up taxas 5%: 7160 / 0.95 = 7536.84 -> 7537
    expect(r.precoSugerido).toBe(7537);
    expect(r.margem).toBe(7160 - custoTotal);
    expect(r.taxas).toBe(7537 - 7160);
  });

  it("é robusto a zeros (sem inputs)", () => {
    const r = calcularPreco(
      {
        gramas: 0,
        materialCustoPorKgCentavos: 0,
        tempoImpressaoH: 0,
        tempoPosH: 0,
        consumiveisCentavos: 0,
        embalagemCentavos: 0,
      },
      settings,
    );
    expect(r.custoTotal).toBe(0);
    expect(r.precoSugerido).toBe(0);
  });

  it("sem taxas, preço = custo * (1 + margem)", () => {
    const r = calcularPreco(
      {
        gramas: 50,
        materialCustoPorKgCentavos: 10000,
        tempoImpressaoH: 0,
        tempoPosH: 0,
        consumiveisCentavos: 0,
        embalagemCentavos: 0,
      },
      { ...settings, taxasPct: 0, bufferFalhaPct: 0 },
    );
    // material = 500, custoTotal = 500, margem 60% -> 800
    expect(r.custoTotal).toBe(500);
    expect(r.precoSugerido).toBe(800);
    expect(r.taxas).toBe(0);
  });

  it("a margem cresce com margemPct", () => {
    const base = {
      gramas: 100,
      materialCustoPorKgCentavos: 12000,
      tempoImpressaoH: 1,
      tempoPosH: 0,
      consumiveisCentavos: 0,
      embalagemCentavos: 0,
    };
    const a = calcularPreco(base, { ...settings, margemPct: 50 });
    const b = calcularPreco(base, { ...settings, margemPct: 80 });
    expect(b.precoSugerido).toBeGreaterThan(a.precoSugerido);
  });
});
