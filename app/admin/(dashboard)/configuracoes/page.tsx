import { PageHeader } from "@/components/admin/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MateriaisManager } from "@/components/admin/materiais-manager";
import { SettingsForm } from "@/components/admin/settings-form";
import { getMateriais, getSettingsVigenteRow } from "@/lib/data/pricing";

export const metadata = { title: "Configurações · 3drizei" };

export default async function ConfiguracoesPage() {
  const [materiais, settings] = await Promise.all([
    getMateriais(false),
    getSettingsVigenteRow(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Sistema"
        title="Configurações"
        description="Materiais e parâmetros de precificação. Tudo editável e versionado."
      />

      <Card>
        <CardHeader>
          <CardTitle>Parâmetros de precificação</CardTitle>
          <CardDescription>
            Base do motor de preço: energia, mão de obra, buffer de falha, margem e taxas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {settings ? (
            <SettingsForm settings={settings} />
          ) : (
            <p className="text-clay-600">Nenhuma configuração encontrada.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Materiais</CardTitle>
          <CardDescription>Filamentos e seus custos por quilo.</CardDescription>
        </CardHeader>
        <CardContent>
          <MateriaisManager materiais={materiais} />
        </CardContent>
      </Card>
    </>
  );
}
