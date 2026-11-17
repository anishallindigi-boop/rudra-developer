"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="47" fill="none" stroke="#D11141" strokeWidth="5" />
      <path
        d="M22 52 40 32l9 10 14-15 15 17v8l-15-16-16 17h-6l-9-10-10 9z"
        fill="#D11141"
      />
      <path d="M38 44h24v22H38z" fill="#D11141" />
      <rect x="46" y="50" width="4" height="4" fill="#fff" />
      <rect x="52" y="50" width="4" height="4" fill="#fff" />
      <rect x="46" y="56" width="4" height="4" fill="#fff" />
      <rect x="52" y="56" width="4" height="4" fill="#fff" />
    </svg>
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Shree Rudra Developers — Home">
      {imgOk ? (
        <Image
          src="/images/logo.png"
          alt="Shree Rudra Developers logo"
          width={96}
          height={96}
          onError={() => setImgOk(false)}
          className="h-11 w-11 rounded-full object-contain md:h-12 md:w-12"
        />
      ) : (
        <LogoMark className="h-11 w-11 md:h-12 md:w-12" />
      )}
      <span className="leading-tight">
        <span className={`block text-[15px] font-extrabold tracking-tight md:text-base ${light ? "text-white" : "text-charcoal"}`}>
          Shree Rudra
        </span>
        <span className={`block text-[10px] font-bold tracking-[0.28em] md:text-[11px] ${light ? "text-gold" : "text-brand"}`}>
          DEVELOPERS
        </span>
      </span>
    </Link>
  );
}
