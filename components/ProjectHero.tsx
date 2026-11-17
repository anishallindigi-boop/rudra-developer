import Link from "next/link";
import ImageSlot from "./ImageSlot";
import Reveal from "./Reveal";
import { ShieldCheck, ArrowRight } from "./icons";
import type { ReactNode } from "react";

export default function ProjectHero({
  badge,
  title,
  sub,
  image,
  alt,
  ctas,
  crumb,
}: {
  badge: string;
  title: ReactNode;
  sub: string;
  image: string;
  alt: string;
  ctas: ReactNode;
  crumb: string;
}) {
  return (
    <section className="relative flex min-h-[78vh] items-center overflow-hidden bg-charcoal">
      <ImageSlot
        src={image}
        alt={alt}
        label={`${crumb} Hero Background`}
        className="absolute inset-0"
        sizes="100vw"
        preload
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/75 to-charcoal/40"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-36 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Reveal>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="transition-colors hover:text-gold">Home</Link>
            <span>/</span>
            <Link href="/projects" className="transition-colors hover:text-gold">Projects</Link>
            <span>/</span>
            <span className="text-gold">{crumb}</span>
          </nav>
        </Reveal>

        <Reveal delay={100}>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold backdrop-blur">
            <ShieldCheck className="h-4 w-4" />
            {badge}
          </span>
        </Reveal>
        <Reveal delay={180}>
          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={260}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {sub}
          </p>
        </Reveal>
        <Reveal delay={340}>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">{ctas}</div>
        </Reveal>
        <Reveal delay={420}>
          <p className="mt-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            <ArrowRight className="h-3.5 w-3.5 text-gold" />
            Scroll karke poori details dekhein
          </p>
        </Reveal>
      </div>
    </section>
  );
}
