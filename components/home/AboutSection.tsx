import ImageSlot from "@/components/ImageSlot";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { Check } from "@/components/icons";
import { SITE } from "@/lib/site";

const HIGHLIGHTS = [
  "100% Legal & RERA Compliant",
  "Modern Urban Planning",
  "Transparent Property Deals",
  "HRERA-Approved Projects",
];

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Image side */}
          <Reveal className="relative">
            <ImageSlot
              src="/image.png"
              alt="Shree Rudra Developers site"
              label="About Us Image"
              className="aspect-[4/3] rounded-3xl shadow-2xl shadow-slate-200"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
            {/* Floating stat card */}
            <div className="absolute -bottom-8 -right-4 rounded-2xl bg-brand px-7 py-6 text-white shadow-2xl shadow-brand/40 sm:right-8">
              <p className="text-4xl font-extrabold">12+</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-white/80">
                Acres of Township
                <br />
                Development
              </p>
            </div>
            {/* Gold frame accent */}
            <div
              className="absolute -left-4 -top-4 -z-10 h-full w-full rounded-3xl border-2 border-gold/50"
              aria-hidden="true"
            />
          </Reveal>

          {/* Text side */}
          <Reveal delay={150}>
            <SectionHeading
              align="left"
              eyebrow="About Us"
              title="A Trusted Name in Haryana Real Estate"
            />
            <p className="mt-6 leading-relaxed text-slate-700">
              Shree Rudra Developers ek bharosemand real estate development aur
              sales firm hai jo modern urban planning aur transparent property
              deals ke liye jaani jaati hai. Hum residential plots se lekar
              complete township development tak har stage par quality aur legal
              clarity (HRERA approved) par focus karte hain — taaki aap aur
              aapka parivar ek safe aur future-ready jagah par apna ghar bana sakein.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-tint text-brand">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-semibold text-charcoal">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-gold">
              {SITE.tagline}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
