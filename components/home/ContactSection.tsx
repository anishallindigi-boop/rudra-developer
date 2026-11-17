import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import InquiryForm from "@/components/InquiryForm";
import { MapPin, Phone, WhatsApp, Instagram, Facebook, ArrowRight } from "@/components/icons";
import { SITE, waLink } from "@/lib/site";

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 bg-white pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Contact & Office Details"
            title="Aaeye, Baat Karein, Site Dekhein"
            sub="Office par walk-in karein, call karein ya WhatsApp karein — hamari team turant reply karegi."
          />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {/* Details + form */}
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-alabaster p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
                  <MapPin className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-sm font-extrabold uppercase tracking-wide text-charcoal">
                  Office Address
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {SITE.address}
                </p>
                <a
                  href={SITE.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
                >
                  View on Google Maps
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-alabaster p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
                  <Phone className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-sm font-extrabold uppercase tracking-wide text-charcoal">
                  Phone / WhatsApp
                </h3>
                <a
                  href={SITE.phoneHref}
                  className="mt-2 block text-sm font-bold text-charcoal hover:text-brand"
                >
                  {SITE.phoneDisplay}
                </a>
                <a
                  href={waLink("Hello Shree Rudra Developers! Mujhe jaankari chahiye.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
                >
                  <WhatsApp className="h-3.5 w-3.5" />
                  WhatsApp par message karein
                </a>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-alabaster p-6 sm:col-span-2">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
                  <Instagram className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-sm font-extrabold uppercase tracking-wide text-charcoal">
                  Social Media
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                  <a
                    href={SITE.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-slate-600 transition-colors hover:text-brand"
                  >
                    Instagram <span className="text-slate-400">(@shree.rudradevelopers)</span>
                  </a>
                  <span className="h-4 w-px bg-slate-200" aria-hidden="true" />
                  <a
                    href={SITE.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-semibold text-slate-600 transition-colors hover:text-brand"
                  >
                    <Facebook className="h-4 w-4" />
                    Shree Rudra Developers
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <InquiryForm />
            </div>
          </Reveal>

          {/* Map */}
          <Reveal delay={150} className="h-full">
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
              <iframe
                title="Shree Rudra Developers — Office Location"
                src={SITE.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-charcoal/60 to-transparent px-6 py-4">
                <p className="pointer-events-auto text-sm font-bold text-white">
                  <MapPin className="mr-1.5 inline h-4 w-4 text-gold" />
                  HUDA Sector 19, Kaithal, Haryana
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
