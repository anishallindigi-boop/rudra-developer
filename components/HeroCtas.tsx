import Link from "next/link";
import type { ReactNode } from "react";

export type HeroCta = {
  label: string;
  href: string;
  icon?: ReactNode;
};

const PRIMARY_CLS =
  "group flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-bold text-white shadow-xl shadow-brand/30 transition-all hover:-translate-y-0.5 hover:bg-brand-dark";
const SECONDARY_CLS =
  "flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-bold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold";

function CtaLink({ cta, className }: { cta: HeroCta; className: string }) {
  const isHttp = /^https?:/i.test(cta.href);

  if (isHttp) {
    return (
      <a
        href={cta.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {cta.icon}
        {cta.label}
      </a>
    );
  }

  return (
    <Link href={cta.href} className={className}>
      {cta.icon}
      {cta.label}
    </Link>
  );
}

/** Two-button CTA row for heroes (dark background). */
export default function HeroCtas({
  primary,
  secondary,
}: {
  primary: HeroCta;
  secondary?: HeroCta;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <CtaLink cta={primary} className={PRIMARY_CLS} />
      {secondary && <CtaLink cta={secondary} className={SECONDARY_CLS} />}
    </div>
  );
}
