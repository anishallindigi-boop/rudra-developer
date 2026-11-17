import ImageSlot from "./ImageSlot";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { Check } from "./icons";
import { SITE } from "@/lib/site";

/** "Our story" two-column block — used on Home and the About page. */
export default function AboutStory({
  eyebrow = "Our Story",
  title,
  paragraphs,
  highlights,
  showStatCard = false,
}: {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  highlights: string[];
  showStatCard?: boolean;
}) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <ImageSlot
              src="/image.png"
              alt="Shree Rudra Developers"
              label="About Us Image"
              className="aspect-[4/3] rounded-3xl shadow-2xl shadow-slate-200"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
            {showStatCard && (
              <>
                <div className="absolute -bottom-8 -right-4 rounded-2xl bg-brand px-7 py-6 text-white shadow-2xl shadow-brand/40 sm:right-8">
                  <p className="text-4xl font-extrabold">12+</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-white/80">
                    Acres of Township
                    <br />
                    Development
                  </p>
                </div>
                <div
                  className="absolute -left-4 -top-4 -z-10 h-full w-full rounded-3xl border-2 border-gold/50"
                  aria-hidden="true"
                />
              </>
            )}
          </Reveal>

          <Reveal delay={150}>
            <SectionHeading align="left" eyebrow={eyebrow} title={title} />
            {paragraphs.filter(Boolean).map((text, i) => (
              <p key={i} className={i === 0 ? "mt-6 leading-relaxed text-slate-700" : "mt-4 leading-relaxed text-slate-700"}>
                {text}
              </p>
            ))}
            {highlights.length > 0 && (
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-tint text-brand">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                    <span className="text-sm font-semibold text-charcoal">{item}</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-gold">
              {SITE.tagline}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
