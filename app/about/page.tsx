import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ImageSlot from "@/components/ImageSlot";
import CTABand from "@/components/CTABand";
import { Check, ShieldCheck, Building2, MapPin, CalendarCheck } from "@/components/icons";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "Shree Rudra Developers — Haryana mein RERA-approved residential townships aur plotted colonies banane wali trusted real estate firm.",
};

const VALUES = [
  { icon: ShieldCheck, title: "100% Legal & RERA Compliant", desc: "Sabhi projects proper government approvals aur RERA guidelines ke anusaar." },
  { icon: Building2, title: "Modern Infrastructure", desc: "Wide paved roads, boundary walls, drainage, street lighting." },
  { icon: MapPin, title: "Prime Connectivity", desc: "Highways, schools, hospitals, city centers ke paas." },
  { icon: CalendarCheck, title: "End-to-End Assistance", desc: "Site visit se registry aur possession tak poora support." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal pb-20 pt-36">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border-[30px] border-brand/20" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading align="left" light eyebrow="About Us" title="A Trusted Name in Haryana Real Estate" sub="Shree Rudra Developers ek bharosemand real estate development aur sales firm hai jo modern urban planning aur transparent property deals ke liye jaani jaati hai." />
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal className="relative">
              <ImageSlot src="/images/about.jpg" alt="Shree Rudra Developers" label="About Us Image" className="aspect-[4/3] rounded-3xl shadow-2xl shadow-slate-200" sizes="(max-width: 1024px) 100vw, 560px" />
            </Reveal>
            <Reveal delay={150}>
              <SectionHeading align="left" eyebrow="Our Story" title="Quality, Legal Clarity & Trust — Har Step Par" />
              <p className="mt-6 leading-relaxed text-slate-700">
                Hum residential plots se lekar complete township development tak har stage par quality aur legal clarity (HRERA approved) par focus karte hain — taaki aap aur aapka parivar ek safe aur future-ready jagah par apna ghar bana sakein. Shree Rudra Homes, Narwana (DDJAY-approved, HRERA-registered) aur Bhagat Singh Colony Extension, Kaithal hamare do live projects hain.
              </p>
              <p className="mt-4 leading-relaxed text-slate-700">
                Transparent property deals, modern urban planning aur government-approved projects — yahi hamari pehchaan hai. Aap invest kar rahe ho ek fully-developed, legally-safe property mein.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {["100% Legal & RERA Compliant", "Modern Urban Planning", "Transparent Property Deals", "HRERA-Approved Projects", "End-to-End Assistance", "Prime Connectivity"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-tint text-brand"><Check className="h-4 w-4" strokeWidth={3} /></span>
                    <span className="text-sm font-semibold text-charcoal">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-gold">{SITE.tagline}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-alabaster py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><SectionHeading eyebrow="Why Choose Us?" title="What Makes Us Different" /></Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="group h-full rounded-3xl bg-white p-7 shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-xl">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-tint text-brand transition-colors group-hover:bg-brand group-hover:text-white"><v.icon className="h-6 w-6" /></span>
                  <h3 className="mt-5 text-lg font-extrabold text-charcoal">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-alabaster pb-20 md:pb-28"><Reveal><CTABand /></Reveal></div>
    </>
  );
}
