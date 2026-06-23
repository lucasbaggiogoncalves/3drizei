"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Save } from "lucide-react";
import { toast } from "sonner";
import type { Despesa } from "@/lib/data/despesas";
import { saveDespesa } from "@/app/admin/(dashboard)/despesas/actions";
import { formatPedidoNumero } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CurrencyInput } from "@/components/admin/currency-input";

const hoje = () => new Date().toISOString().slice(0, 10);

export function DespesaFormDialog({
  despesa,
  pedidos,
  trigger,
}: {
  despesa?: Despesa;
  pedidos: { id: string; numero: number; clienteNome: string | null }[];
  trigger?: React.ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();

  const [categoria, setCategoria] = useState(despesa?.categoria ?? "");
  const [tipo, setTipo] = useState<"recorrente" | "variavel">(
    (despesa?.tipo as "recorrente" | "variavel") ?? "variavel",
  );
  const [valor, setValor] = useState(despesa?.valor_centavos ?? 0);
  const [data, setData] = useState(despesa?.data ?? hoje());
  const [descricao, setDescricao] = useState(despesa?.descricao ?? "");
  const [pedidoId, setPedidoId] = useState<string | null>(despesa?.pedido_id ?? null);

  function submit() {
    start(async () => {
      const res = await saveDespesa({
        id: despesa?.id,
        categoria,
        tipo,
        valorCentavos: valor,
        data,
        descricao,
        pedidoId,
      });
      if (res.error) {
        toast.error(res.error);
        return;
      }
      toast.success(despesa ? "Despesa atualizada." : "Despesa lançada.");
      setOpen(false);
      router.refresh();
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="rounded-full">
            <Plus className="size-4" />
            Nova despesa
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{despesa ? "Editar despesa" : "Nova despesa"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label>Categoria</Label>
              <Input
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                placeholder="Filamento, energia, marketing..."
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Tipo</Label>
              <Select value={tipo} onValueChange={(v) => setTipo(v as typeof tipo)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="variavel">Variável</SelectItem>
                  <SelectItem value="recorrente">Recorrente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Valor</Label>
              <CurrencyInput value={valor} onChange={setValor} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Data</Label>
              <Input type="date" value={data} onChange={(e) => setData(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Pedido (opcional)</Label>
              <Select
                value={pedidoId ?? "none"}
                onValueChange={(v) => setPedidoId(v === "none" ? null : v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sem vínculo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sem vínculo</SelectItem>
                  {pedidos.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {formatPedidoNumero(p.numero)} · {p.clienteNome ?? "Sem cliente"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Descrição (opcional)</Label>
            <Input value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" className="rounded-full" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button className="rounded-full" onClick={submit} disabled={pending}>
              {pending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
