"use client";

import { Copy, Trash2 } from "lucide-react";

export default function ImageCard({
  src,
  filename,
  meta,
  onCopy,
  onDelete,
}: {
  src: string;
  filename: string;
  meta: string;
  onCopy: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={src}
          alt={filename}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-end gap-1.5 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          <button
            type="button"
            onClick={onCopy}
            title="Copy URL"
            aria-label={`Copy URL of ${filename}`}
            className="pointer-events-auto rounded-md bg-white/95 p-1.5 text-slate-700 shadow-sm transition-colors hover:bg-white"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            title="Delete"
            aria-label={`Delete ${filename}`}
            className="pointer-events-auto rounded-md bg-white/95 p-1.5 text-red-600 shadow-sm transition-colors hover:bg-white"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="px-3 py-2">
        <p className="truncate text-xs font-semibold text-charcoal" title={filename}>
          {filename}
        </p>
        <p className="text-[10px] text-slate-400">{meta}</p>
      </div>
    </div>
  );
}
