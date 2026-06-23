"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function FotoUploader({
  value,
  onChange,
}: {
  value: string[];
  onChange: (paths: string[]) => void;
}) {
  const supabase = createClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  function publicUrl(path: string) {
    return supabase.storage.from("produtos").getPublicUrl(path).data.publicUrl;
  }

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    const novos: string[] = [];
    for (const file of Array.from(files)) {
      const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${crypto.randomUUID()}-${safe}`;
      const { error } = await supabase.storage
        .from("produtos")
        .upload(path, file, { upsert: false });
      if (error) {
        toast.error(`Erro ao enviar ${file.name}: ${error.message}`);
        continue;
      }
      novos.push(path);
    }
    if (novos.length) onChange([...value, ...novos]);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function remover(path: string) {
    onChange(value.filter((p) => p !== path));
    await supabase.storage.from("produtos").remove([path]);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {value.map((path) => (
          <div
            key={path}
            className="group relative size-24 overflow-hidden rounded-xl border border-border/70 bg-clay-100"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={publicUrl(path)}
              alt="Foto do produto"
              className="size-full object-cover"
            />
            <button
              type="button"
              onClick={() => remover(path)}
              className="absolute right-1 top-1 grid size-6 place-items-center rounded-full bg-ink/60 text-white opacity-0 transition group-hover:opacity-100"
              aria-label="Remover foto"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={cn(
            "layerlines grid size-24 place-items-center rounded-xl border border-dashed border-border bg-clay-50 text-clay-500 transition hover:border-terracotta-300 hover:text-terracotta-600",
          )}
        >
          {uploading ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <ImagePlus className="size-5" />
          )}
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <p className="text-xs text-clay-500">
        A primeira foto é a capa. PNG ou JPG, fundo claro de preferência.
      </p>
    </div>
  );
}
