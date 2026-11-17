"use client";

import { useState } from "react";
import Image from "next/image";
import { Building2 } from "./icons";

type ImageSlotProps = {
  /** Path inside public/, e.g. "/images/hero-home.jpg" */
  src: string;
  alt: string;
  /** Label shown on the placeholder while the real image is missing */
  label: string;
  /** Outer classes — control size/position here, e.g. "absolute inset-0" or "aspect-[4/3]" */
  className?: string;
  /** Extra classes for the <img> itself */
  imgClassName?: string;
  sizes?: string;
  /** Pass true for hero/LCP images */
  preload?: boolean;
  /** object-cover (default) or object-contain */
  fit?: "cover" | "contain";
};

/**
 * Renders the image if the file exists in public/, otherwise shows a
 * branded placeholder telling the owner which file to drop in.
 */
export default function ImageSlot({
  src,
  alt,
  label,
  className = "",
  imgClassName = "",
  sizes = "100vw",
  preload = false,
  fit = "cover",
}: ImageSlotProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`overflow-hidden bg-alabaster ${className}`}>
      <div className="relative h-full w-full">
        {!failed ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            preload={preload}
            onError={() => setFailed(true)}
            className={`${fit === "cover" ? "object-cover" : "object-contain"} ${imgClassName}`}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-gradient-to-br from-rose-tint via-white to-alabaster p-6 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
              <Building2 className="h-6 w-6" />
            </span>
            <p className="text-sm font-bold text-charcoal">{label}</p>
            <p className="text-xs text-slate-500">
              Image yahan daalein: <code className="rounded bg-white px-1.5 py-0.5 text-[11px] text-brand shadow-sm">public/images/{src.replace("/images/", "")}</code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
