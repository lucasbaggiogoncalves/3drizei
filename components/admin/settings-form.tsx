"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import type { PricingSettingsRow } from "@/lib/data/pricing";
import { saveSettings } from "@/app/admin/(dashboard)/configuracoes/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CurrencyInput } from "@/components/admin/currency-input";

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
          <Input
            id="consumo"
            type="number"
            min={0}
            value={consumoW || ""}
            onChange={(e) => setConsumoW(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="buffer">Buffer de falha (%)</Label>
          <Input
            id="buffer"
            type="number"
            min={0}
            step="0.5"
            value={bufferFalha || ""}
            onChange={(e) => setBufferFalha(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="embalagem">Embalagem padrão</Label>
          <CurrencyInput id="embalagem" value={embalagem} onChange={setEmbalagem} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="margem">Margem (%)</Label>
          <Input
            id="margem"
            type="number"
            min={0}
            step="1"
            value={margem || ""}
            onChange={(e) => setMargem(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="taxas">Taxas (%)</Label>
          <Input
            id="taxas"
            type="number"
            min={0}
            max={99.9}
            step="0.5"
            value={taxas || ""}
            onChange={(e) => setTaxas(Number(e.target.value))}
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
