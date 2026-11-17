import type { ComponentType, ReactNode } from "react";

/** Rounded info card with a brand icon — used on Contact + Home contact sections. */
export default function InfoCard({
  icon: Icon,
  title,
  children,
  className = "",
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-slate-100 bg-alabaster p-6 ${className}`}>
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-sm font-extrabold uppercase tracking-wide text-charcoal">
        {title}
      </h3>
      <div className="mt-2 text-sm leading-relaxed text-slate-600">{children}</div>
    </div>
  );
}
