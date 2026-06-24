"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { DespesaCategoria, DespesaListItem } from "@/lib/data/despesas";
import { deleteDespesa } from "@/app/admin/(dashboard)/despesas/actions";
import { DespesaFormDialog } from "@/components/admin/despesa-form-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function DespesaActions({
  despesa,
  categorias,
  pedidos,
}: {
  despesa: DespesaListItem;
  categorias: DespesaCategoria[];
  pedidos: { id: string; numero: number; clienteNome: string | null }[];
}) {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pending, start] = useTransition();

  function remover() {
    start(async () => {
      const res = await deleteDespesa(despesa.id);
      if (res.error) toast.error(res.error);
      else {
        toast.success("Despesa removida.");
        setConfirmOpen(false);
        router.refresh();
      }
    });
  }

  return (
    <div className="flex items-center justify-end gap-1">
      <DespesaFormDialog
        despesa={despesa}
        categorias={categorias}
        pedidos={pedidos}
        trigger={
          <Button size="icon" variant="ghost" className="size-8 rounded-full">
            <Pencil className="size-4" />
          </Button>
        }
      />
      <Button
        size="icon"
        variant="ghost"
        className="size-8 rounded-full text-danger-500 hover:bg-danger-50 hover:text-danger-700"
        onClick={() => setConfirmOpen(true)}
      >
        <Trash2 className="size-4" />
      </Button>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remover despesa</DialogTitle>
            <DialogDescription>
              Remover a despesa de <strong>{despesa.categoriaNome}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" className="rounded-full" onClick={() => setConfirmOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              className="rounded-full"
              onClick={remover}
              disabled={pending}
            >
              {pending ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
              Remover
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
