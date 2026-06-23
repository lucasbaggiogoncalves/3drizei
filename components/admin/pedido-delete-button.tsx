"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deletePedido } from "@/app/admin/(dashboard)/pedidos/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function PedidoDeleteButton({
  id,
  numero,
}: {
  id: string;
  numero: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();

  function remover() {
    start(async () => {
      const res = await deletePedido(id);
      if (res.error) toast.error(res.error);
      else {
        toast.success("Pedido removido.");
        router.push("/admin/pedidos");
        router.refresh();
      }
    });
  }

  return (
    <>
      <Button
        variant="ghost"
        className="rounded-full text-danger-500 hover:bg-danger-50 hover:text-danger-700"
        onClick={() => setOpen(true)}
      >
        <Trash2 className="size-4" />
        Remover
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remover pedido {numero}</DialogTitle>
            <DialogDescription>
              Esta ação remove o pedido, seus itens e histórico. Não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" className="rounded-full" onClick={() => setOpen(false)}>
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
    </>
  );
}
