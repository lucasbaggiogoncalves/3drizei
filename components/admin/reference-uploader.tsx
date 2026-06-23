"use client";

import { useRef, useState } from "react";
import { FileUp, Loader2, Paperclip, X } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

function nomeDoPath(path: string) {
  return path.replace(/^[0-9a-fA-F-]{36}-/, "");
}

export function ReferenceUploader({
  value,
  onChange,
}: {
  value: string[];
  onChange: (paths: string[]) => void;
}) {
  const supabase = createClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    const novos: string[] = [];
    for (const file of Array.from(files)) {
      const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${crypto.randomUUID()}-${safe}`;
      const { error } = await supabase.storage
        .from("referencias")
        .upload(path, file, { upsert: false });
      if (error) {
        toast.error(`Erro ao enviar ${file.name}`);
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
    await supabase.storage.from("referencias").remove([path]);
  }

  return (
    <div className="space-y-2">
      {value.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {value.map((path) => (
            <li
              key={path}
              className="flex items-center gap-1.5 rounded-full bg-clay-100 py-1 pl-2.5 pr-1 text-xs text-clay-700"
            >
              <Paperclip className="size-3" />
              <span className="max-w-40 truncate">{nomeDoPath(path)}</span>
              <button
                type="button"
                onClick={() => remover(path)}
                className="grid size-4 place-items-center rounded-full text-clay-500 hover:bg-clay-200"
              >
                <X className="size-3" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 rounded-full border border-dashed border-border px-3 py-1.5 text-xs text-clay-600 transition hover:border-terracotta-300 hover:text-terracotta-600"
      >
        {uploading ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : (
          <FileUp className="size-3.5" />
        )}
        Anexar referência
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
