"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import type { Cliente } from "@/lib/data/clientes";
import { saveCliente } from "@/app/admin/(dashboard)/clientes/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const schema = z.object({
  nome: z.string().min(1, "Informe o nome"),
  email: z.union([z.string().email("Email inválido"), z.literal("")]).default(""),
  telefone: z.string().default(""),
  cpf_cnpj: z.string().default(""),
  endereco: z.object({
    cep: z.string().default(""),
    logradouro: z.string().default(""),
    numero: z.string().default(""),
    complemento: z.string().default(""),
    bairro: z.string().default(""),
    cidade: z.string().default(""),
    uf: z.string().default(""),
  }),
  notas: z.string().default(""),
});

type FormValues = z.input<typeof schema>;

function fromCliente(cliente?: Cliente): FormValues {
  const e = (cliente?.endereco as Record<string, string> | null) ?? {};
  return {
    nome: cliente?.nome ?? "",
    email: cliente?.email ?? "",
    telefone: cliente?.telefone ?? "",
    cpf_cnpj: cliente?.cpf_cnpj ?? "",
    endereco: {
      cep: e.cep ?? "",
      logradouro: e.logradouro ?? "",
      numero: e.numero ?? "",
      complemento: e.complemento ?? "",
      bairro: e.bairro ?? "",
      cidade: e.cidade ?? "",
      uf: e.uf ?? "",
    },
    notas: cliente?.notas ?? "",
  };
}

export function ClienteForm({
  cliente,
  onSaved,
  onCancel,
}: {
  cliente?: Cliente;
  onSaved?: (id: string) => void;
  onCancel?: () => void;
}) {
  const [pending, start] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: fromCliente(cliente),
  });

  function onSubmit(values: FormValues) {
    start(async () => {
      const res = await saveCliente({
        id: cliente?.id,
        nome: values.nome,
        email: values.email ?? "",
        telefone: values.telefone ?? "",
        cpf_cnpj: values.cpf_cnpj ?? "",
        endereco: values.endereco,
        notas: values.notas ?? "",
      });
      if (res.error) {
        toast.error(res.error);
        return;
      }
      toast.success(cliente ? "Cliente atualizado." : "Cliente cadastrado.");
      if (res.id) onSaved?.(res.id);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="nome">Nome</Label>
          <Input id="nome" {...register("nome")} placeholder="Maria Silva" />
          {errors.nome ? (
            <p className="text-xs text-danger-700">{errors.nome.message}</p>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email ? (
            <p className="text-xs text-danger-700">{errors.email.message}</p>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="telefone">Telefone / WhatsApp</Label>
          <Input id="telefone" {...register("telefone")} placeholder="(31) 9...." />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="cpf">CPF / CNPJ (opcional)</Label>
          <Input id="cpf" {...register("cpf_cnpj")} />
        </div>
      </div>

      <div>
        <p className="eyebrow mb-2">Endereço</p>
        <div className="grid gap-3 sm:grid-cols-6">
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label className="text-xs text-clay-500">CEP</Label>
            <Input {...register("endereco.cep")} />
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-3">
            <Label className="text-xs text-clay-500">Logradouro</Label>
            <Input {...register("endereco.logradouro")} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-clay-500">Número</Label>
            <Input {...register("endereco.numero")} />
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label className="text-xs text-clay-500">Complemento</Label>
            <Input {...register("endereco.complemento")} />
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label className="text-xs text-clay-500">Bairro</Label>
            <Input {...register("endereco.bairro")} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-clay-500">Cidade</Label>
            <Input {...register("endereco.cidade")} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-clay-500">UF</Label>
            <Input maxLength={2} {...register("endereco.uf")} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="notas">Notas</Label>
        <Textarea id="notas" rows={3} {...register("notas")} placeholder="Preferências, observações..." />
      </div>

      <div className="flex items-center justify-end gap-2">
        {onCancel ? (
          <Button type="button" variant="ghost" className="rounded-full" onClick={onCancel}>
            Cancelar
          </Button>
        ) : null}
        <Button type="submit" className="rounded-full" disabled={pending}>
          {pending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {cliente ? "Salvar" : "Cadastrar cliente"}
        </Button>
      </div>
    </form>
  );
}
