import Link from "next/link";
import { PageHeader } from "@/components/admin/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PricingCalculator } from "@/components/admin/pricing-calculator";
import {
  getMateriais,
  getSettingsVigenteRow,
  toPricingSettings,
} from "@/lib/data/pricing";

export const metadata = { title: "Calculadora · 3drizei" };

export default async function CalculadoraPage() {
  const [materiais, settingsRow] = await Promise.all([
    getMateriais(true),
    getSettingsVigenteRow(),
  ]);

  if (!settingsRow) {
    return (
      <>
        <PageHeader eyebrow="Precificação" title="Calculadora" />
        <Card>
          <CardContent className="space-y-4 py-12 text-center text-clay-600">
            <p>Configure os parâmetros de precificação para começar.</p>
            <Button asChild className="rounded-full">
              <Link href="/admin/configuracoes">Ir para Configurações</Link>
            </Button>
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Precificação"
        title="Calculadora de preço"
        description="Estime o preço de uma encomenda. Usa os parâmetros vigentes (energia, mão de obra, margem)."
      />
      <Card>
        <CardContent className="pt-6">
          <PricingCalculator
            materiais={materiais}
            settings={toPricingSettings(settingsRow)}
            initial={{ embalagemCentavos: settingsRow.embalagem_padrao_centavos }}
          />
        </CardContent>
      </Card>
    </>
  );
}
