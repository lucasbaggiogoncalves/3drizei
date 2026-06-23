import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/page-header";
import { ProductForm } from "@/components/admin/product-form";
import { getProduto } from "@/lib/data/produtos";
import {
  getMateriais,
  getSettingsVigenteRow,
  toPricingSettings,
} from "@/lib/data/pricing";

export const metadata = { title: "Editar produto · 3drizei" };

export default async function EditarProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [produto, materiais, settingsRow] = await Promise.all([
    getProduto(id),
    getMateriais(false),
    getSettingsVigenteRow(),
  ]);

  if (!produto) notFound();

  return (
    <>
      <PageHeader eyebrow="Catálogo · Editar" title={produto.nome} />
      {settingsRow ? (
        <ProductForm
          materiais={materiais}
          settings={toPricingSettings(settingsRow)}
          produto={produto}
        />
      ) : null}
    </>
  );
}
