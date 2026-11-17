"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus, Maximize2, Building2 } from "./icons";

/**
 * Zoomable image viewer — master map / layout plans ke liye.
 * Missing image hone par branded placeholder dikhata hai.
 */
export default function ZoomSlot({
  src,
  alt,
  label,
  className = "",
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const [scale, setScale] = useState(1);
  const MIN = 1;
  const MAX = 3;

  const zoomIn = () => setScale((s) => Math.min(MAX, +(s + 0.25).toFixed(2)));
  const zoomOut = () => setScale((s) => Math.max(MIN, +(s - 0.25).toFixed(2)));

  return (
    <div className={`relative ${className}`}>
      <div className="h-[480px] w-full overflow-auto rounded-2xl border border-slate-200 bg-slate-100 shadow-inner sm:h-[560px]">
        {!failed ? (
          <div className="relative transition-[width,height] duration-300 ease-out" style={{ width: `${scale * 100}%`, height: `${scale * 100}%`, minWidth: "100%", minHeight: "100%" }}>
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              onError={() => setFailed(true)}
              className="object-contain"
            />
          </div>
        ) : (
          <div className="flex h-full min-h-[480px] flex-col items-center justify-center gap-3 bg-gradient-to-br from-rose-tint via-white to-alabaster p-8 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
              <Building2 className="h-7 w-7" />
            </span>
            <p className="text-base font-bold text-charcoal">{label}</p>
            <p className="max-w-xs text-sm text-slate-500">
              Final map image yahan daalein:{" "}
              <code className="rounded bg-white px-1.5 py-0.5 text-xs text-brand shadow-sm">
                public/images/{src.replace("/images/", "")}
              </code>
            </p>
            <p className="text-xs text-slate-400">
              Daalne ke baad yeh interactive zoom viewer ke saath automatically dikhega.
            </p>
          </div>
        )}
      </div>

      {/* Zoom controls */}
      {!failed && (
        <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-charcoal/90 p-1.5 shadow-lg backdrop-blur">
          <button
            type="button"
            onClick={zoomOut}
            disabled={scale <= MIN}
            aria-label="Zoom out"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 disabled:opacity-40"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-12 text-center text-xs font-bold text-gold">{Math.round(scale * 100)}%</span>
          <button
            type="button"
            onClick={zoomIn}
            disabled={scale >= MAX}
            aria-label="Zoom in"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
          </button>
          <span className="mx-1 h-5 w-px bg-white/20" aria-hidden="true" />
          <button
            type="button"
            onClick={() => setScale(1)}
            aria-label="Reset zoom"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
