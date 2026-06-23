import Link from "next/link";
import { PageHeader } from "@/components/admin/page-header";
import { ProductForm } from "@/components/admin/product-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  getMateriais,
  getSettingsVigenteRow,
  toPricingSettings,
} from "@/lib/data/pricing";

export const metadata = { title: "Novo produto · 3drizei" };

export default async function NovoProdutoPage() {
  const [materiais, settingsRow] = await Promise.all([
    getMateriais(true),
    getSettingsVigenteRow(),
  ]);

  return (
    <>
      <PageHeader eyebrow="Catálogo · Novo" title="Novo produto" />
      {settingsRow ? (
        <ProductForm materiais={materiais} settings={toPricingSettings(settingsRow)} />
      ) : (
        <Card>
          <CardContent className="space-y-4 py-12 text-center text-clay-600">
            <p>Configure os parâmetros de precificação antes de cadastrar produtos.</p>
            <Button asChild className="rounded-full">
              <Link href="/admin/configuracoes">Ir para Configurações</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
