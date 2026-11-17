import Reveal from "@/components/Reveal";

export type ProjectFact = { label: string; value?: string; highlight?: boolean };

/** Floating facts strip that overlaps the project hero. */
export default function ProjectFacts({ facts }: { facts: ProjectFact[] }) {
  const items = facts.filter((fact) => fact.value);
  if (items.length === 0) return null;

  return (
    <section className="relative z-10 -mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-2xl shadow-slate-200/70 sm:grid-cols-2 lg:grid-cols-5 lg:p-7">
            {items.map((fact) => (
              <div
                key={fact.label}
                className={`rounded-2xl px-4 py-4 ${
                  fact.highlight ? "bg-rose-tint ring-1 ring-brand/15" : "bg-alabaster"
                }`}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  {fact.label}
                </p>
                <p
                  className={`mt-1.5 text-sm font-extrabold leading-tight tracking-tight ${
                    fact.highlight ? "text-brand" : "text-charcoal"
                  }`}
                >
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
