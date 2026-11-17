import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import type { ReactNode } from "react";

/** Dark charcoal banner used at the top of all inner pages. */
export default function PageHero({
  eyebrow,
  title,
  sub,
  children,
  narrow = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  children?: ReactNode;
  narrow?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-charcoal pb-20 pt-36">
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border-[30px] border-brand/20"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full border-[30px] border-gold/10"
        aria-hidden="true"
      />
      <div
        className={`relative mx-auto px-4 sm:px-6 lg:px-8 ${narrow ? "max-w-3xl" : "max-w-7xl"}`}
      >
        <Reveal>
          <SectionHeading as="h1" align="left" light eyebrow={eyebrow} title={title} sub={sub} />
        </Reveal>
        {children && (
          <Reveal delay={150}>
            <div className="mt-10">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
