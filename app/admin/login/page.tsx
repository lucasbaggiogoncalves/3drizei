import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Logo } from "@/components/brand/logo";
import { LoginForm } from "@/components/admin/login-form";

export const metadata = {
  title: "Entrar · 3drizei",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const { erro } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    if (profile?.role === "admin") {
      redirect("/admin");
    }
  }

  return (
    <main className="grid min-h-dvh lg:grid-cols-2">
      {/* Painel da marca */}
      <div className="relative hidden overflow-hidden bg-gradient-warm lg:block">
        <div className="layerlines absolute inset-0 opacity-40" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <span className="eyebrow text-white/80">Atelier · Backoffice</span>
          <div className="max-w-md">
            <h1 className="font-heading text-4xl font-semibold leading-tight">
              Presentes que guardam memória.
            </h1>
            <p className="mt-4 text-lg text-white/85">
              A gente modela, imprime e acaba à mão — camada por camada. Este é o
              seu espaço pra organizar pedidos, produtos e contas.
            </p>
          </div>
          <p className="text-sm text-white/70">
            3drizei · Impressão 3D personalizada
          </p>
        </div>
      </div>

      {/* Formulário */}
      <div className="flex items-center justify-center bg-clay-50 p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex flex-col items-start gap-2">
            <Logo withDescriptor />
          </div>
          <h2 className="font-heading text-2xl font-semibold text-clay-950">
            Bom te ver de novo
          </h2>
          <p className="mt-1 text-clay-600">Entre com sua conta de admin.</p>

          <div className="mt-8">
            <LoginForm avisoSemAcesso={erro === "sem-acesso"} />
          </div>
        </div>
      </div>
    </main>
  );
}
