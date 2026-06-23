"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import type { Material } from "@/lib/data/pricing";
import type { PricingSettings } from "@/lib/pricing/engine";
import type { ProdutoComVariacoes } from "@/lib/data/produtos";
import type {
  PersonalizacaoField,
  ProdutoPayload,
  VariacaoInput,
} from "@/lib/produto-types";
import { saveProduto } from "@/app/admin/(dashboard)/produtos/actions";
import { slugify } from "@/lib/format";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FotoUploader } from "@/components/admin/foto-uploader";
import { PersonalizacaoEditor } from "@/components/admin/personalizacao-editor";
import { VariacoesEditor, novaVariacao } from "@/components/admin/variacoes-editor";

function mapVariacao(v: ProdutoComVariacoes["produto_variacoes"][number]): VariacaoInput {
  return {
    id: v.id,
    nome: v.nome ?? "",
    opcoes: (v.opcoes as Record<string, string>) ?? {},
    materialId: v.material_id,
    gramas: Number(v.gramas),
    tempoImpressaoH: Number(v.tempo_impressao_h),
    tempoPosH: Number(v.tempo_pos_h),
    pesoG: Number(v.peso_g),
    dimX: v.dim_x_mm,
    dimY: v.dim_y_mm,
    dimZ: v.dim_z_mm,
    consumiveisCentavos: v.consumiveis_centavos,
    embalagemCentavos: v.embalagem_centavos,
    precoVendaCentavos: v.preco_venda_centavos,
    controlaEstoque: v.controla_estoque,
    estoque: v.estoque,
    sku: v.sku ?? "",
    ativo: v.ativo,
  };
}

export function ProductForm({
  materiais,
  settings,
  produto,
}: {
  materiais: Material[];
  settings: PricingSettings;
  produto?: ProdutoComVariacoes;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const editando = Boolean(produto);

  const [nome, setNome] = useState(produto?.nome ?? "");
  const [slug, setSlug] = useState(produto?.slug ?? "");
  const [slugTocado, setSlugTocado] = useState(editando);
  const [descricao, setDescricao] = useState(produto?.descricao ?? "");
  const [leadTime, setLeadTime] = useState(produto?.lead_time_dias ?? 7);
  const [ativo, setAtivo] = useState(produto?.ativo ?? true);
  const [fotos, setFotos] = useState<string[]>(produto?.fotos ?? []);
  const [personalizacao, setPersonalizacao] = useState<PersonalizacaoField[]>(
    () =>
      ((produto?.personalizacao_schema as PersonalizacaoField[] | null) ?? []).map(
        (f) => ({ ...f, id: f.id ?? crypto.randomUUID() }),
      ),
  );
  const [variacoes, setVariacoes] = useState<VariacaoInput[]>(() =>
    produto?.produto_variacoes?.length
      ? produto.produto_variacoes.map(mapVariacao)
      : [novaVariacao()],
  );

  function onNomeChange(v: string) {
    setNome(v);
    if (!slugTocado) setSlug(slugify(v));
  }

  function submit() {
    const payload: ProdutoPayload = {
      id: produto?.id,
      nome,
      slug: slug || slugify(nome),
      descricao,
      leadTimeDias: leadTime,
      ativo,
      fotos,
      personalizacao: personalizacao.filter((f) => f.label.trim()),
      variacoes,
    };

    if (!payload.nome.trim()) {
      toast.error("Informe o nome do produto.");
      return;
    }
    if (payload.variacoes.length === 0) {
      toast.error("Adicione ao menos uma variação.");
      return;
    }

    start(async () => {
      const res = await saveProduto(payload);
      if (res.error) {
        toast.error(res.error);
        return;
      }
      toast.success(editando ? "Produto atualizado." : "Produto criado.");
      router.push("/admin/produtos");
      router.refresh();
    });
  }

  return (
    <div className="space-y-6 pb-24">
      <Card>
        <CardHeader>
          <CardTitle>Dados gerais</CardTitle>
          <CardDescription>Informações que descrevem o produto na loja.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => onNomeChange(e.target.value)}
              placeholder="Luminária lua personalizada"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => {
                setSlugTocado(true);
                setSlug(slugify(e.target.value));
              }}
              placeholder="luminaria-lua"
            />
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Conte a história do produto, com a voz da marca."
              rows={4}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="lead">Prazo de produção (dias)</Label>
            <Input
              id="lead"
              type="number"
              min={0}
              value={leadTime}
              onChange={(e) => setLeadTime(Number(e.target.value))}
            />
          </div>
          <label className="flex items-end gap-3 pb-2">
            <Switch checked={ativo} onCheckedChange={setAtivo} />
            <span className="text-sm text-clay-700">Produto ativo (visível na loja)</span>
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fotos</CardTitle>
          <CardDescription>A primeira imagem é usada como capa.</CardDescription>
        </CardHeader>
        <CardContent>
          <FotoUploader value={fotos} onChange={setFotos} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personalização do cliente</CardTitle>
          <CardDescription>
            O que o cliente informa ao pedir este produto. As respostas ficam
            congeladas em cada pedido.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PersonalizacaoEditor value={personalizacao} onChange={setPersonalizacao} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Variações</CardTitle>
          <CardDescription>
            Cada variação tem seu próprio custo, peso e preço. A calculadora sugere
            o preço com base nos parâmetros vigentes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VariacoesEditor
            value={variacoes}
            onChange={setVariacoes}
            materiais={materiais}
            settings={settings}
          />
        </CardContent>
      </Card>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-end gap-3 px-6 py-3">
          <Button
            type="button"
            variant="ghost"
            className="rounded-full"
            onClick={() => router.push("/admin/produtos")}
          >
            Cancelar
          </Button>
          <Button type="button" className="rounded-full" onClick={submit} disabled={pending}>
            {pending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            {editando ? "Salvar alterações" : "Criar produto"}
          </Button>
        </div>
      </div>
    </div>
  );
}
