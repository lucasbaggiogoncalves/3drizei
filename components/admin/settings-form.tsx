"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import type { PricingSettingsRow } from "@/lib/data/pricing";
import { saveSettings } from "@/app/admin/(dashboard)/configuracoes/actions";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CurrencyInput } from "@/components/admin/currency-input";
import { NumericInput } from "@/components/admin/numeric-input";

export function SettingsForm({ settings }: { settings: PricingSettingsRow }) {
  const router = useRouter();
  const [pending, start] = useTransition();

  const [horaMaquina, setHoraMaquina] = useState(settings.hora_maquina_centavos);
  const [kwh, setKwh] = useState(settings.kwh_centavos);
  const [consumoW, setConsumoW] = useState(settings.consumo_w);
  const [bufferFalha, setBufferFalha] = useState(Number(settings.buffer_falha_pct));
  const [maoObra, setMaoObra] = useState(settings.mao_obra_hora_centavos);
  const [margem, setMargem] = useState(Number(settings.margem_pct));
  const [taxas, setTaxas] = useState(Number(settings.taxas_pct));
  const [embalagem, setEmbalagem] = useState(settings.embalagem_padrao_centavos);

  function salvar() {
    start(async () => {
      const res = await saveSettings({
        horaMaquinaCentavos: horaMaquina,
        kwhCentavos: kwh,
        consumoW,
        bufferFalhaPct: bufferFalha,
        maoObraHoraCentavos: maoObra,
        margemPct: margem,
        taxasPct: taxas,
        embalagemPadraoCentavos: embalagem,
      });
      if (res.error) toast.error(res.error);
      else {
        toast.success("Parâmetros salvos (nova versão).");
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="hora-maquina">Hora de máquina</Label>
          <CurrencyInput id="hora-maquina" value={horaMaquina} onChange={setHoraMaquina} />
          <p className="text-xs text-clay-500">Depreciação/desgaste por hora de impressão.</p>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="mao-obra">Mão de obra / hora</Label>
          <CurrencyInput id="mao-obra" value={maoObra} onChange={setMaoObra} />
          <p className="text-xs text-clay-500">Aplicada ao tempo de pós-processamento.</p>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="kwh">Custo do kWh</Label>
          <CurrencyInput id="kwh" value={kwh} onChange={setKwh} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="consumo">Consumo da impressora (W)</Label>
          <NumericInput
            id="consumo"
            step="1"
            suffix="W"
            value={consumoW || null}
            onChange={(v) => setConsumoW(v ?? 0)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="buffer">Buffer de falha (%)</Label>
          <NumericInput
            id="buffer"
            step="0.5"
            suffix="%"
            value={bufferFalha || null}
            onChange={(v) => setBufferFalha(v ?? 0)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="embalagem">Embalagem padrão</Label>
          <CurrencyInput id="embalagem" value={embalagem} onChange={setEmbalagem} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="margem">Margem (%)</Label>
          <NumericInput
            id="margem"
            step="1"
            suffix="%"
            value={margem || null}
            onChange={(v) => setMargem(v ?? 0)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="taxas">Taxas (%)</Label>
          <NumericInput
            id="taxas"
            step="0.5"
            suffix="%"
            value={taxas || null}
            onChange={(v) => setTaxas(v ?? 0)}
          />
          <p className="text-xs text-clay-500">Ex: taxa do Mercado Pago. Embutida no preço.</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border/70 pt-4">
        <p className="text-xs text-clay-500">
          Versão vigente: <span className="font-mono">v{settings.versao}</span> · salvar
          cria uma nova versão (pedidos antigos mantêm o cálculo).
        </p>
        <Button type="button" className="rounded-full" onClick={salvar} disabled={pending}>
          {pending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Salvar parâmetros
        </Button>
      </div>
    </div>
  );
}
