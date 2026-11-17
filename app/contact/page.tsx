import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import InquiryForm from "@/components/InquiryForm";
import { Phone, MapPin, WhatsApp, Instagram, Facebook, ArrowRight } from "@/components/icons";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Shree Rudra Developers se contact karein — office HUDA Sector 19, Kaithal. Call, WhatsApp ya site visit book karein.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-charcoal pb-20 pt-36">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading align="left" light eyebrow="Contact Us" title="Aaeye, Baat Karein, Site Dekhein" sub="Office par walk-in karein, call karein ya WhatsApp karein — hamari team turant reply karegi." />
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-alabaster p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand shadow-sm"><MapPin className="h-5 w-5" /></span>
                  <h3 className="mt-4 text-sm font-extrabold uppercase tracking-wide text-charcoal">Office Address</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{SITE.address}</p>
                  <a href={SITE.mapsLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline">View on Google Maps <ArrowRight className="h-3.5 w-3.5" /></a>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-alabaster p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand shadow-sm"><Phone className="h-5 w-5" /></span>
                  <h3 className="mt-4 text-sm font-extrabold uppercase tracking-wide text-charcoal">Phone / WhatsApp</h3>
                  <a href={SITE.phoneHref} className="mt-2 block text-sm font-bold text-charcoal hover:text-brand">{SITE.phoneDisplay}</a>
                  <a href={`https://wa.me/${SITE.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"><WhatsApp className="h-3.5 w-3.5" /> WhatsApp par message karein</a>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-alabaster p-6 sm:col-span-2">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand shadow-sm"><Instagram className="h-5 w-5" /></span>
                  <h3 className="mt-4 text-sm font-extrabold uppercase tracking-wide text-charcoal">Social Media</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                    <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-600 transition-colors hover:text-brand">Instagram <span className="text-slate-400">(@shree.rudradevelopers)</span></a>
                    <span className="h-4 w-px bg-slate-200" aria-hidden="true" />
                    <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-semibold text-slate-600 transition-colors hover:text-brand"><Facebook className="h-4 w-4" /> Shree Rudra Developers</a>
                  </div>
                </div>
              </div>
              <div className="mt-6"><InquiryForm /></div>
            </Reveal>
            <Reveal delay={150} className="h-full">
              <div className="relative h-full min-h-[420px] overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
                <iframe title="Office Location" src={SITE.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0" allowFullScreen />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
