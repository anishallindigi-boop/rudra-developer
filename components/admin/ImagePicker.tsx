"use client";

import { useState } from "react";
import { ImagePlus, X } from "lucide-react";

import { imageSrc } from "@/lib/imageUrl";
import ImageUploadModal from "./ImageUploadModal";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImagePicker({ value, onChange, label }: Props) {
  const [open, setOpen] = useState(false);
  const preview = imageSrc(value);

  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
          {label}
        </label>
      )}

      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 pl-2.5 transition-colors focus-within:border-brand/40 focus-within:ring-2 focus-within:ring-brand/10">
        {preview ? (
          <img
            src={preview}
            alt={label || "Selected image"}
            className="h-10 w-10 shrink-0 rounded-lg object-cover"
          />
        ) : (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-alabaster text-slate-300">
            <ImagePlus className="h-4 w-4" />
          </span>
        )}

        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Image URL ya library se pick karein"
          className="min-w-0 flex-1 bg-transparent text-sm text-charcoal outline-none placeholder:text-slate-400"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            title="Clear"
            aria-label="Clear image"
            className="shrink-0 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-dark"
        >
          <ImagePlus className="h-3.5 w-3.5" />
          Pick
        </button>
      </div>

      <ImageUploadModal
        open={open}
        onSelect={(urls) => {
          onChange(urls[0] || "");
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
        multiple={false}
      />
    </div>
  );
}
