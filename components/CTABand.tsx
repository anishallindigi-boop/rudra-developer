import { Phone, WhatsApp, CalendarCheck } from "./icons";
import { SITE, waLink } from "../lib/site";

export default function CTABand({
  title = "Apne Sapno ka Ghar Aaj Book Karein",
  sub = "Free site visit book karein ya seedha call/WhatsApp karein — hamari team aapko har step par guide karegi.",
}: {
  title?: string;
  sub?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand via-brand to-brand-dark px-6 py-14 text-center shadow-2xl shadow-brand/30 sm:px-12">
        {/* Decorative rings */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full border-[20px] border-white/10" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-20 -right-12 h-64 w-64 rounded-full border-[24px] border-black/10" aria-hidden="true" />

        <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur">
          <CalendarCheck className="h-7 w-7" />
        </span>
        <h2 className="relative mt-5 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          {title}
        </h2>
        <p className="relative mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
          {sub}
        </p>
        <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={waLink("Hello Shree Rudra Developers! Main free site visit book karna chahta/chahti hoon.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-brand shadow-lg transition-all hover:-translate-y-0.5 hover:bg-rose-tint sm:w-auto"
          >
            <WhatsApp className="h-5 w-5" />
            WhatsApp Karein
          </a>
          <a
            href={SITE.phoneHref}
            className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/40 px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:border-white hover:bg-white/10 sm:w-auto"
          >
            <Phone className="h-5 w-5" />
            Call: {SITE.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
